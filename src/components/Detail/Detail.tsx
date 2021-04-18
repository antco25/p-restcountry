import React, { FunctionComponent, useState } from 'react';
import './Detail.scss';
import { Theme, listToText, numberWithComma } from '../utility/utility';
import { ReactComponent as ArrowIcon } from './barrow.svg';
import { Link, Redirect, RouteComponentProps, useParams } from 'react-router-dom';
import { getCountryData } from '../../redux/data/dataSlice';

interface DetailProps extends RouteComponentProps {
    theme: Theme
}

const Detail: FunctionComponent<DetailProps> = (props) => {

    const { countryId } = useParams<{ countryId: string }>();
    const country = getCountryData(countryId)

    const onBackClick = () => {
        props.history.goBack();
    }

    if (country === undefined) {
        return (
            <Redirect to='/error' />
        )
    }

    return (
        <div className={`detail ${props.theme}`}>
            <div className="detail-wrap app-wrap">
                <section className="detail-back">
                    <div className="detail-back-btn" onClick={onBackClick}><ArrowIcon /> <p>Back</p></div>
                </section>
                <section className="detail-info">
                    <section className="detail-info-img">
                        <img src={country.flag} />
                    </section>
                    <section className="detail-info-data">
                        <h1 className="title">{country.name}</h1>
                        <div className="data-col-wrap">
                            <section className="data-col">
                                <p className="data-row"><span className="data-title">Native Name: </span>{country.nativeName}</p>
                                <p className="data-row"><span className="data-title">Population: </span>{numberWithComma(country.population)}</p>
                                <p className="data-row"><span className="data-title">Region: </span>{country.region}</p>
                                <p className="data-row"><span className="data-title">Sub Region: </span>{country.subregion}</p>
                                <p className="data-row"><span className="data-title">Capital: </span>{country.capital}</p>
                            </section>
                            <section className="data-col">
                                <p className="data-row"><span className="data-title">Top Level Domain: </span>{listToText(country.topLevelDomain)}</p>
                                <p className="data-row"><span className="data-title">Currencies: </span>{listToText(country.currencies)}</p>
                                <p className="data-row"><span className="data-title">Languages: </span>{listToText(country.languages)}</p>
                            </section>
                        </div>
                        <section className="border-co">
                            <p>Border Countries: </p>
                            <ul>
                                {country.borderNames.map(b => {
                                    return <li><Link to={`/country/${b.alpha3Code}`}>{b.name}</Link></li>
                                })}
                            </ul>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    );


}

export default Detail;