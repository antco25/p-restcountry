import React, { FunctionComponent } from 'react';
import './ThemeToggle.scss';
import { ReactComponent as MoonIcon } from './moon.svg'
import { Theme } from '../utility/utility';

type ThemeToggleProps = {
  theme: Theme,
  callback: () => void,
}

const ThemeToggle: FunctionComponent<ThemeToggleProps> = (props) => {

  function onClick() {
    props.callback();
  }

  return (
    <div className={`themeToggle ${props.theme}`} onClick={() => onClick()}>
      <div className="toggleWrapper">
        <MoonIcon className="moon-icon" />
        <p>Dark Mode</p>
      </div>
    </div>
  );
}

export default ThemeToggle;
