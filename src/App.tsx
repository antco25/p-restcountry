import React, { useEffect, useState } from 'react';
import './App.scss';
import { Theme } from './components/utility/utility';
import CountryGrid from './components/CountryGrid/CountryGrid';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectData } from './redux/data/dataSlice';

function App() {
  const data = useSelector(selectData)
  const dispatch = useDispatch();

  const [appTheme, setAppTheme] = useState<Theme>("dark-theme");

  useEffect(() => {
    if (data.status === 'loading') {
      dispatch(fetchData())
    }
  }, [data.status, dispatch])

  const toggleTheme = () => {
    if (appTheme === "light-theme") {
      setAppTheme("dark-theme")
    } else {
      setAppTheme('light-theme')
    }
  }

  if (data.status === 'loading' || data.status === 'error') {
    return (
      <div className={`App ${appTheme}`}>
        <section className={`header ${appTheme}`}>
          <div className="header-wrapper app-wrap">
            <h1>Where in the world?</h1>
            <ThemeToggle theme={appTheme} callback={toggleTheme} />
          </div>
        </section>
        <div className="loading-wrap app-wrap">
          {data.status === 'loading' ? "Loading..." : "Error"}
        </div>
      </div>
    )
  }

  return (
    <div className={`App ${appTheme}`}>
      <section className={`header ${appTheme}`}>
        <div className="header-wrapper app-wrap">
          <h1>Where in the world?</h1>
          <ThemeToggle theme={appTheme} callback={toggleTheme} />
        </div>
      </section>
      <Switch>
        <Route path="/country/:countryId" render={(props) => (
          <Detail {...props} theme={appTheme} />
        )} />
        <Route path="/error" render={(props) => (
          <Error {...props} theme={appTheme} />
        )} />
        <Route path="/:params" render={(props) => (
          <CountryGrid {...props} theme={appTheme} />
        )} />
        <Route path="/" render={(props) => (
          <CountryGrid {...props} theme={appTheme} />
        )} />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
}

export default App;