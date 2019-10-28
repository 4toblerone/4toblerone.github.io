import React, { useState, Fragment } from 'react';
import './Sidebar.css';
import { Logo } from '../Logo'
import {
    Link,
    useLocation
} from "react-router-dom";

import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

function ProjectNav() {
    const projects = ['mirage', 'slow-side'];
    const location = useLocation();

    return (
       <Fragment>
           {/*<div className="about">*/}
           {/*    <Link to={'/'}>About</Link>*/}
           {/*</div>*/}
           <div className="project-navigation">
               {projects.map((p, i) => {
                   const projectLink = `/${p}`;
                   const selected = projectLink === location.pathname;

                   return (
                       <div key={i} className={`project ${selected ? 'selected' : ''}`}>
                           <Link to={projectLink}>{p}</Link>
                       </div>
                   );
               })}
           </div>
       </Fragment>
    )
}

function Contact() {
    const [contactVisible, setContactVisible] = useState(false);

    return (
        <div className="contact">
            <span className="contact-header" onClick={() => setContactVisible(!contactVisible)}>Contact</span>
            {contactVisible && (
                <div className="social">
                    <a href="https://twitter.com/4evertoblerone" target='_blank' rel='noopener noreferrer'><TwitterIcon fontSize="small" /></a>
                    <a href="https://www.instagram.com/4evertoblerone" target='_blank' rel='noopener noreferrer'><InstagramIcon fontSize="small" /></a>
                </div>
            )}
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="sidebar">
            <Logo />
            <ProjectNav />
            <Contact />
        </div>
    );
}
