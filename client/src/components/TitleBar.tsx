import React from 'react';
import './css/titleBar.css';

function TitleBar() {
    return (
        <header className="mdc-top-app-bar">
                <div className="mdc-top-app-bar__row">
                    <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <span className="mdc-top-app-bar__title">HackaThon</span>
                    </section>
                </div>
        </header>
    )
}

export default TitleBar;
