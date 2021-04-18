import React, { FunctionComponent, useState } from 'react';
import './Searchbox.scss';
import { ReactComponent as SearchIcon } from './magnify-glass.svg'
import { Theme, getGridParams } from '../utility/utility';
import { History } from 'history';
import queryString from 'query-string'

type SearchProps = {
  theme: Theme,
  history: History,
  value: string,
}

const Searchbox: FunctionComponent<SearchProps> = (props) => {

  const [input, setInput] = useState(props.value)

  const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    const location = props.history.location
    const gridParams = getGridParams(location.search === "" ? location.pathname : location.search);
    
    if (input === '') {
      delete gridParams.search;
    } else {
      gridParams.search = input.replace(/\s/g, '-');
    }

    if (Object.keys(gridParams).length === 0) {
      props.history.replace({ pathname: '/'})
    } else {
      props.history.replace({ pathname: '?' + queryString.stringify(gridParams)})
    }

    e.preventDefault();
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className={`searchbox ${props.theme}`}>
      <form onSubmit={e => onSubmit(e)}>
        <SearchIcon />
        <input type="text" placeholder="Search for a country..." name="search" onChange={onChange} value={input}/>
      </form>
    </div>
  );
}

export default Searchbox;
