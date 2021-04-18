import React, { FunctionComponent } from 'react';
import './Error.scss';
import { Theme } from '../utility/utility';
import { ReactComponent as ArrowIcon } from './barrow.svg';
import { Link, RouteComponentProps } from 'react-router-dom';

interface ErrorProps extends RouteComponentProps {
    theme: Theme
}

const Error: FunctionComponent<ErrorProps> = (props) => {

    return (
        <div className={`error ${props.theme}`}>
            <div className="error-wrap app-wrap">
                <section className="error-back">
                    <Link to="/" className="error-back-btn"><ArrowIcon /> <p>Back</p></Link>
                </section>
                <section className="error-info">
                    Error
                </section>
            </div>
        </div>
    )
}

export default Error;