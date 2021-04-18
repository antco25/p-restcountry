import React, { FunctionComponent } from 'react';
import './Card.scss';
import { Theme, numberWithComma } from '../utility/utility';

export type CardData = {
  flag: string,
  name: string,
  population: number,
  region: string,
  capital: string,
}

export type CardProps = {
  data: CardData,
  theme: Theme,
  onClick?: () => void,
}

const Card: FunctionComponent<CardProps> = (props) => {
  return (
    <div className={`card ${props.theme}`} onClick={props.onClick}>
      <img className="card-img" src={props.data.flag} />
      <section className="card-data">
        <h1 className="title">{props.data.name}</h1>
        <p className="data-row"><span className="data-title">Population: </span>{numberWithComma(props.data.population)}</p>
        <p className="data-row"><span className="data-title">Region: </span>{props.data.region}</p>
        <p className="data-row"><span className="data-title">Capital: </span>{props.data.capital}</p>
      </section>
    </div>
  );
}

export default Card;
