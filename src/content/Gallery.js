import React, { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive'
import ScrollToTop from 'react-scroll-up';
import ReadMoreReact from 'read-more-react';
import { ArrowUpward } from '@material-ui/icons';
import Mirage from '../projects/mirage';
import SlowSide from '../projects/slow-side';


const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 481 });
    return isDesktop ? children : null
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 480 });
    return isMobile ? children : null
};

const ProjectMap = {
    'mirage': Mirage,
    'slow-side': SlowSide,
};

const ArrowKeys = {
    LEFT: 37,
    RIGHT: 39,
};

/**
 * Props.Project - Current active project ro show
 *
 * @param props - { project: string }
 * @returns {*}
 * @constructor
 */
export class Gallery extends React.PureComponent {
    state = {
        index: 0,
        project: null,
        showAbout: false,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const project = prevState.project;
        let index = prevState.index;
        let showAbout = prevState.showAbout;

        if (project !== nextProps.project) {
            index = 0;
            showAbout = false;
        }


        return {
            index,
            showAbout,
            project: nextProps.project,
        }
    }

    setIndex = (index) => {
        if (this.state.showAbout) {
            return;
        }

        this.setState({
            index
        });
    };

    onNext = () => {
        let index = this.state.index;
        const currentProject = ProjectMap[this.props.project];
        const photosLength = currentProject.photos.length;

        if (index === photosLength - 1) {
            index = 0;
        } else {
            index++;
        }

        this.setIndex(index);
    };

    onPreviouse = () => {
        let index = this.state.index;
        const currentProject = ProjectMap[this.props.project];
        const photosLength = currentProject.photos.length;

        if (index === 0) {
            index = photosLength - 1;
        } else {
            index--;
        }

        this.setIndex(index);
    };

    toggleAbout = () => {
      this.setState((state) => {
          return {
              showAbout: !state.showAbout,
          }
      })
    };

    componentDidMount(){
        document.addEventListener("keydown", this.onKey.bind(this), false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.onKey.bind(this), false);
    }

    onKey(event) {
        console.log(event);
        if (event.keyCode === ArrowKeys.LEFT) {
            return this.onPreviouse();
        }

        if (event.keyCode === ArrowKeys.RIGHT) {
            return this.onNext();
        }
    }

    renderPhoto(photo) {
        return (
            <div className={'photo'} key={photo} >
                <img src={photo} alt={photo} />
            </div>
        );
    }

    renderNavigation() {
        return (
            <div className="navigation">
                <div className={'read-more-info'} onClick={this.toggleAbout} >Project Info</div>
                <span onClick={this.onPreviouse}> &#60; <span>prev</span> </span><span onClick={this.onNext}> <span>next</span> ></span>
            </div>
        );
    }

    render() {
        const project = ProjectMap[this.props.project];
        const currentImg = 0;

        if (!project) {
            return (
                <h1>Project you are looking for doesnt exist yet :)</h1>
            )
        }

        const photo = project.photos[currentImg];
        const aboutExists = project.about && project.about.length > 0;

        console.log('about ', );
        return (
            <div className="gallery">
                <Desktop>
                    {this.state.showAbout && aboutExists ? (
                        <Fragment>
                            <div className="read-more-container">
                                {project.about}
                                <div className="back-to-project" onClick={this.toggleAbout}>
                                    Back to Project
                                </div>
                            </div>
                            {this.renderNavigation()}
                        </Fragment>
                    ) : (
                        <Fragment>
                            {project.photos.map((p) => {
                                return this.renderPhoto(p);
                            })}
                           {/*// {this.renderPhoto(photo, null, false)}*/}
                            {this.renderNavigation()}
                        </Fragment>
                    )}
                </Desktop>
               <Mobile>
                   {aboutExists && (
                       <div className={'description'}>
                           <ReadMoreReact
                            text={project.about}
                           />
                       </div>
                   )}
                   {project.photos.map((p) => {
                       return this.renderPhoto(p);
                   })}
                   <ScrollToTop showUnder={160} duration={1000}>
                       <div className={'scroll-to-top'}><ArrowUpward /></div>
                   </ScrollToTop>
               </Mobile>
            </div>
        );
    }
}
