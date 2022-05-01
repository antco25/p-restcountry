import React, { FunctionComponent, useEffect } from 'react';
import './CountryGrid.scss';
import Card from '../Card/Card';
import { Theme, getGridParams, isInvalidParams, capitalizeFirstLetter } from '../utility/utility';
import Searchbox from '../Searchbox/Searchbox';
import Dropdown from '../Dropdown/Dropdown';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType, selectData, setFilters, RegionType } from '../../redux/data/dataSlice';

interface CountryGridProps extends RouteComponentProps {
    theme: Theme,
}

function getFilters(pathname: string) {
    const gridParams = getGridParams(pathname);
    const filters: FilterType = { region: 'All', search: '' }

    if (Object.prototype.hasOwnProperty.call(gridParams, 'region')) {
        filters.region = capitalizeFirstLetter(gridParams.region) as RegionType;
    }

    if (Object.prototype.hasOwnProperty.call(gridParams, 'search')) {
        filters.search = gridParams.search;
    }

    return filters
}

const CountryGrid: FunctionComponent<CountryGridProps> = (props) => {

    const history = props.history
    const data = useSelector(selectData);
    const countries = data.countries
    const dispatch = useDispatch()

    //Check if filters have changed
    useEffect(() => {
        const pathname = history.location.search === '' ? history.location.pathname : history.location.search
        const filters = getFilters(pathname)

        if (filters.region !== data.filters.region
            || filters.search !== data.filters.search) {
            dispatch(setFilters(filters))
        }
    })


    //Check for invalid URLs
    if (props.match.path === '/:params') {
        if (isInvalidParams(props.location.pathname))
            return <Redirect to="/" />
    } else if (props.match.path === '/' &&
        props.location.search !== '') {
        if (isInvalidParams(props.location.search))
            return <Redirect to="/" />
    }

    return (
        <div className="countryGrid app-wrap">
            <section className="filter">
                <div className="filter-wrap">
                    <Searchbox theme={props.theme} history={history} value={data.filters.search} />
                    <Dropdown theme={props.theme} history={history} value={data.filters.region} />
                </div>
            </section>
            <div className="countryGrid-wrap ">
                {countries.map((country, index) => {
                    return <Link to={`/country/${country.alpha3Code}`} key={index} ><Card theme={props.theme} data={country} /></Link>
                })}
            </div>
        </div>
    );
}

export default CountryGrid;
