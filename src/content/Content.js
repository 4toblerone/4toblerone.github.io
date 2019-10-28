import React from 'react';
import { Gallery } from './Gallery';
import './Content.css';
import { Switch, Route, Redirect } from 'react-router-dom'

// function AboutMe() {
//     return (
//         <div className="about-me">
//             Hello, i am Sasa Trifunovic, software engineer turned photo artist.
//         </div>
//     );
// }

export function Content() {
    return (
        <div className="content">
            <Switch>
                <Route exact path="/">
                    {/*<AboutMe />*/}
                    <Redirect to="/mirage" />
                </Route>
                <Route path="/:project" render={({ match: { params }}) => {
                    return (
                        <Gallery project={params.project}/>
                    );
                }} />
            </Switch>
        </div>
    );
}
