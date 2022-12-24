import React, { FunctionComponent, ReactNode, useState, useRef, useEffect } from 'react';
import './Dropdown.scss';
import { ReactComponent as Arrow } from './arrow.svg'
import { Theme, getGridParams } from '../utility/utility';
import { regions, RegionType } from '../../redux/data/dataSlice';
import { History } from 'history';
import queryString from 'query-string'

type DropdownProps = {
  theme: Theme,
  history: History,
  value: string
}

const Dropdown: FunctionComponent<DropdownProps> = (props) => {

  const [selected, setSelected] = useState(props.value === "All" ? "Filter by Region" : props.value)
  const [showOptions, setShowOptions] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  useEffect(() => {
    if (props.value === "All") {
      setSelected("Filter by Region");
    } else {
      setSelected(props.value)
    }
  }, [props.value])

  function onOptionClick(option: RegionType) {
    const location = props.history.location
    const gridParams = getGridParams(location.search === "" ? location.pathname : location.search);

    if (option === "All") {
      setSelected("Filter by Region");
      delete gridParams.region;
    } else {
      setSelected(option)
      gridParams.region = option.toLowerCase()
    }

    if (Object.keys(gridParams).length === 0) {
      props.history.replace({ pathname: '/' })
    } else {
      props.history.replace({ pathname: '?' + queryString.stringify(gridParams) })
    }

    setShowOptions(false);
  }

  function onClick() {
    setShowOptions(!showOptions);
  }

  function getOptions(options: RegionType[]): ReactNode {
    return options.map((option, index) =>
      <li key={index} className="option" onClick={() => onOptionClick(option)}>{option}</li>
    )
  }


  return (
    <div className={`dropdown ${props.theme}`} ref={ref}>
      <div className="dropdown-selected" onClick={(e) => onClick()}>
        <span className="selected">{selected}</span>
        <Arrow transform={showOptions ? "rotate(180)" : undefined} />
      </div>
      <ul className={`dropdown-options ${showOptions ? "options-visible" : null}`}>
        {getOptions(regions)}
      </ul>
    </div>
  );
}

export default Dropdown;
