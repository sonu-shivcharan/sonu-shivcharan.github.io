import AboutMeSection from "./components/AboutMe.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
  
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value, enumerable: true, configurable: true, writable: true
    });
  } else {
    obj[key] = value;
  }return obj;
}
class App extends React.Component {
  constructor(props) {
    super(props); _defineProperty(this, "handleResize", () => {
      this.setState({
        screenWidth: window.innerWidth
      });
      console.log("resized to : ", this.state.screenWidth);
    }); _defineProperty(this, "updateState",

      event => {
        const classes = event.target.className;
        if (classes.indexOf("menu") >= 0) {
          this.setState({
            isNavOpen: true
          });
        } else if (classes.indexOf("modal") >= 0 && this.state.isNavOpen) {
          this.setState({
            isNavOpen: false
          });
        } else if (classes.indexOf("share") >= 0) {
          this.handleShare();
        } else if (classes.indexOf("modal") >= 0 && this.state.openSharePanel) {
          this.setState({
            openSharePanel: false
          });
        } else {
          this.setState({
            isNavOpen: false
          });
        }
      }); _defineProperty(this,
      "handleScroll",

      () => {
        const scrollTop = window.scrollY;
        this.setState({
          scrollTop: scrollTop
        });
      }); _defineProperty(this,
      "handleShare",
      () => {
        if (navigator.share) {
          const data = {
            title: "Sonu Shivcharan-Portfolio",
            url: document.location.href
          };

          navigator.
          share(data).
          then(() => console.log("Thanks For sharing")).
          catch(err => err);
        } else {
          this.setState({
            openSharePanel: true
          });
        }
      }); this.state = {
      scrollTop: 0, screenWidth: window.innerWidth, isNavOpen: false, openSharePanel: false, isContentLoaded: false, aboutMe: {}, mySkills: {}, projects: {}, navBar: {}
    };
  }componentDidMount() {
    window.addEventListener("scroll",
      this.handleScroll); window.addEventListener("resize",
      this.handleResize);
    fetch("./src/data.json").then(resp => resp.json()).then(data => {
      this.setState({
        isContentLoaded: true, aboutMe: data.aboutMe, mySkills: data.mySkills, projects: data.projects, contact: data.contact, navBar: data.navBar, socialProfiles: data.socialProfiles.profile
      }); console.log("Data fetched Sucessfully");
    }).catch(err => console.log("falied to fetch", err)); document.getElementById("footer").style.position = "relative";
  } //updates state
  componentDidUpdate(prevProps,
    prevState) {
    const getHeight = name => document.getElementById(name).offsetHeight; const prevHeight = prevState.aboutSectionHeight; const currHeight = getHeight("about-me-section"); if (prevHeight == null || prevHeight < currHeight) {
      this.setState({
        heroSectionHeight: getHeight("hero-section"), aboutSectionHeight: getHeight("about-me-section"), skillSectionHeight: getHeight("skills-section"), projectsSectionHeight: getHeight("projects-section"), contactSectionHeight: getHeight("contact")
      });
    }}componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); window.removeEventListener("resize", this.handleResize);
  } //handles resizes
  render() {
    const state = this.state;
    let i;
    i = state.screenWidth <= 480 ? 150: 300;
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
        React.createElement(Header, {
          scrollTop: state.scrollTop,
          state: state,
          updateState: this.updateState,
          navBar: state.navBar
        }), /*#__PURE__*/

        React.createElement(SideNav, {
          updateState: this.updateState,
          state: state,
          sideNav: state.navBar
        }), /*#__PURE__*/

        React.createElement(HeroSection, {
          scrollTop: state.scrollTop,
          margin: state.heroSectionHeight
        }), /*#__PURE__*/

        React.createElement(AboutMeSection, {
          scrollTop: state.scrollTop,
          aboutMe: state.aboutMe,
          isLoaded: state.isContentLoaded,
          updateState: this.updateState
        }), /*#__PURE__*/

        React.createElement(SkillsSection, {
          mySkills: state.mySkills,
          scrollHeight: state.heroSectionHeight + state.aboutSectionHeight - i,
          scrollTop: state.scrollTop
        }), /*#__PURE__*/

        React.createElement(ProjectsSection, {
          projectItems: state.projects,
          scrollHeight:
          state.heroSectionHeight +
          state.aboutSectionHeight +
          state.skillSectionHeight -
          i,

          scrollTop: state.scrollTop,
          screenWidth: state.screenWidth
        }), /*#__PURE__*/

        React.createElement(ContactSection, {
          contact: state.contact,
          scrollHeight:
          state.heroSectionHeight +
          state.aboutSectionHeight +
          state.skillSectionHeight +
          state.projectsSectionHeight -
          i,

          scrollTop: state.scrollTop
        }), /*#__PURE__*/

        React.createElement(Footer, {
          profiles: state.socialProfiles
        }), /*#__PURE__*/

        React.createElement("div", {
          className: "modal flex",
          style: {
            display: `${
            state.isNavOpen || state.openSharePanel ? "block": "none"
            }`
          },

          onClick: this.updateState
        }),

        state.openSharePanel ? /*#__PURE__*/React.createElement(SharePanel, null): null));


  }}

class SharePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "panel-container flex",
        style: {
          width: "100%", position: "relative"
        }
      }, /*#__PURE__*/

        React.createElement("div", {
          id: "share-panel", style: {
            animation: "0.1s slideUp ease 1"
          }
        }, /*#__PURE__*/
          React.createElement("h4", null, "Share Via"), /*#__PURE__*/
          React.createElement("div", {
            className: "flex"
          }, /*#__PURE__*/
            React.createElement("a", {
              href: "whatsapp://send?text=https://sonu-shivcharan.github.io",
              "data-action": "share/whatsapp/share",
              target: "_blank",
              className: "share-icon"
            }, /*#__PURE__*/

              React.createElement("i", {
                className: "fa-brands fa-whatsapp"
              })), /*#__PURE__*/

            React.createElement("a", {
              href: "#", className: "share-icon"
            }, /*#__PURE__*/
              React.createElement("i", {
                className: "fa-brands fa-facebook"
              })), /*#__PURE__*/

            React.createElement("a", {
              href: "#", className: "share-icon"
            }, /*#__PURE__*/
              React.createElement("i", {
                className: "fa fa-envelope"
              })), /*#__PURE__*/

            React.createElement("a", {
              href: "#", className: "share-icon"
            }, /*#__PURE__*/
              React.createElement("i", {
                className: "fa fa-copy"
              }))))));





  }}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let changeStyle = {
      backgroundColor: "transparent",
      color: "#fff"
    };

    if (this.props.scrollTop > 100) {
      changeStyle.backdropFilter = "blur(5px)";
      changeStyle.backgroundColor = "rgba(12,12,12,0.7)";
    }
    const {
      items: navItems
    } = this.props.navBar;
    return /*#__PURE__*/(
      React.createElement("header", {
        id: "header", style: changeStyle
      }, /*#__PURE__*/

        React.createElement("div", {
          id: "title"
        }, /*#__PURE__*/
          React.createElement("i", {
            className: "fa-solid fa-bars menu-icon",
            onClick: this.props.updateState
          }), /*#__PURE__*/

          React.createElement("h1", null, "Portfolio"), /*#__PURE__*/

          React.createElement("div", {
            id: "nav"
          }, /*#__PURE__*/
            React.createElement("div", {
              className: "nav-list"
            },
              navItems &&
              navItems.map((item) => /*#__PURE__*/
                React.createElement("a", {
                  key: item.name + "Nav",
                  href: item.url,
                  className: "nav-item"
                },

                  item.name)))))));

  }}

class SideNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sideNav = {
      marginLeft: "0"
    };

    if (this.props.state.isNavOpen) {
      sideNav.marginLeft = "0";
    } else {
      sideNav.marginLeft = "-16rem";
    }
    const {
      items: navItems
    } = this.props.sideNav;
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "side-nav", style: sideNav
      }, /*#__PURE__*/
        React.createElement("h3", null, "Portfolio"), /*#__PURE__*/
        React.createElement("ul", {
          className: "side-nav-list"
        },
          navItems &&
          navItems.map(item => {
            return /*#__PURE__*/(
              React.createElement("a", {
                key: item.name + "Side",
                href: item.url,
                className: "side-nav-item",
                title: item.name,
                onClick: this.props.updateState
              }, /*#__PURE__*/

                React.createElement("li", null, item.name)));
          }))));



  }}

class HeroSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: ""
    };

  }
  render() {
    let scrollTop = this.props.scrollTop;
    let circle = {
      borderRadius: "50%",
      animation: "rotate 1s ease 1",
      transition: "transform 0.3s linear",
      transform: `rotate(${scrollTop >= 600 ? 300: 0.5 * scrollTop}deg)`
    };

    const Circles = /*#__PURE__*/
    React.createElement("div", {
      id: "circle-container", className: "hero-background"
    }, /*#__PURE__*/
      React.createElement("div", {
        className: "circle1", style: circle
      }), /*#__PURE__*/
      React.createElement("div", {
        className: "circle2", style: circle
      }), /*#__PURE__*/
      React.createElement("div", {
        className: "circle3", style: circle
      }), /*#__PURE__*/
      React.createElement("div", {
        className: "circle4", style: circle
      }));


    const centerBTN = {
      width: "100%",
      position: "absolute",
      bottom: "10%",
      display: "flex",
      justifyContent: "center",
      zIndex: 5
    };

    let backBlur = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      display: "none",
      transition: "0.3s"
    };


    return /*#__PURE__*/(
      React.createElement("section", {
        id: "hero-section"
      },
        Circles, /*#__PURE__*/
        React.createElement("div", {
          style: backBlur
        }), /*#__PURE__*/
        React.createElement("div", null, /*#__PURE__*/
          React.createElement("h3", null, "Hey I'm"), /*#__PURE__*/
          React.createElement("h1", null, "Sonu Shivcharan"), /*#__PURE__*/
          React.createElement("div", {
            id: "about"
          }, /*#__PURE__*/
            React.createElement("span", null, "A "), /*#__PURE__*/
            React.createElement("span", null, "Web developer"))), /*#__PURE__*/


        React.createElement("div", {
          style: centerBTN
        }, /*#__PURE__*/
          React.createElement("button", {
            className: "action-btn"
          }, /*#__PURE__*/
            React.createElement("a", {
              href: "#contact"
            }, "Get In Touch")))));
  }}
class SkillsSection extends React.Component {
  constructor(props) {
    super(props); _defineProperty(this, "increment", () => {
      if (this.state.level <= 100) {
        this.setState({
          level: this.state.level + 1
        });

        setTimeout(() => this.increment(), 5);
      }
    }); this.state = {
      level: 0
    };
  }
  render() {
    const props = this.props;
    const {
      skills
    } = props.mySkills;
    //FIX ME : calling increment() properly
    /* if(props.scrollTop>=(props.scrollHeight-100) && props.scrollTop<=props.scrollHeight+500){
              this.increment();
      }
      */
    return /*#__PURE__*/(
      React.createElement("section", {
        id: "skills-section"
      }, /*#__PURE__*/
        React.createElement("h2", {
          className: "text-gradient"
        }, "My Skils"), /*#__PURE__*/
        React.createElement("div", {
          id: "skills-container"
        },
          skills &&
          skills.map(skill => {
            return /*#__PURE__*/(
              React.createElement("div", {
                className: `skill ${
                props.scrollTop >= props.scrollHeight - 100 ?
                "slideUp":
                "shiftDown"
                }`,
                key: skill.name
              }, /*#__PURE__*/

                React.createElement("p", {
                  className: "name"
                },
                  skill.name, " ", skill.level, "%"), /*#__PURE__*/

                React.createElement("div", {
                  className: "level-wrapper"
                }, /*#__PURE__*/
                  React.createElement("div", {
                    className: "level",
                    style: {
                      width: `${skill.level}%`,
                      transform: `translateX(-${
                      props.scrollTop >= props.scrollHeight ? 0: 100
                      }%)`
                    }
                  }))));
          }))));
  }}


/*----project items----*/
class ProjectsSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const {
      items
    } = props.projectItems;
    return /*#__PURE__*/(
      React.createElement("section", {
        id: "projects-section"
      }, /*#__PURE__*/
        React.createElement("h2", null, "My Projects"), /*#__PURE__*/
        React.createElement("div", {
          id: "projects-container"
        },
          items &&
          items.map(item => {
            let i = 100,
            j;
            j = props.screenWidth <= 480 ? 0: 400;
            return /*#__PURE__*/(
              React.createElement("div", {
                key: item.name,
                className: `project-item ${
                props.scrollTop >= props.scrollHeight - j + item.id * i ?
                "slideUp":
                "shiftDown"
                }`
              }, /*#__PURE__*/

                React.createElement("div", {
                  className: "img-container"
                }, /*#__PURE__*/
                  React.createElement("div", {
                    style: {
                      background: `url(${item.img.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    },

                    className: "project-img"
                  })), /*#__PURE__*/
                React.createElement("div", {
                  className: "flex"
                }, /*#__PURE__*/
                  React.createElement("h3", null, item.name), " ", /*#__PURE__*/
                  React.createElement("a", {
                    href: item.url, target: "_blank"
                  }, /*#__PURE__*/
                    React.createElement("i", {
                      className: "fa-solid fa-arrow-up-right-from-square"
                    })))));
          }))));
  }}

class ContactForm extends React.Component {
  constructor(props) {
    super(props); _defineProperty(this,
      "handleInputChange",
      event => {
        const {name,value} = event.target;
        this.setState({
          [name]: value
        });
      }); 
const firebaseConfig = {
    apiKey: "AIzaSyB-DGznEj3XdGajQCCw0fvDrjNca2v-RV8",
    authDomain: "portfoliosonu.firebaseapp.com",
    databaseURL: "https://portfoliosonu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfoliosonu",
    storageBucket: "portfoliosonu.appspot.com",
    messagingSenderId: "762043520383",
    appId: "1:762043520383:web:d0d613d78bb1d1090d364a",
    measurementId: "G-Q6VBD62EY5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
// Access the database
const database = getDatabase(app);

      _defineProperty(this,
      "handleSubmit",
      event => {
        event.preventDefault();
this.setState({timestamp: Date.now()});
  const contactForm = document.getElementById("contact-form");
  const databaseRef = ref(database, "contactMessages/"+name); // Adjust the path as needed
  set(databaseRef, this.state)
    .then(() => {
      console.log("Contact data saved successfully!");
      contactForm.reset();
      console.log(contactForm);
      //TODO : display data submit message/prompt
    })
    .catch((error) => {
      console.error("Error saving contact data:", error);
      // TODO: Handle errors,display an error message
    });
      }); 
      this.state = {
      name: "",
      email: "", 
      message: "",
      timestamp:""
    };
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("form", {
        id: "contact-form", onSubmit: this.handleSubmit
      }, /*#__PURE__*/
        React.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/
          React.createElement("label", {
            htmlFor: "name"
          }, "Name:"), /*#__PURE__*/
          React.createElement("input", {
            type: "text",
            id: "name",
            name: "name",
            placeholder: "Name",
            value: this.state.name,
            onChange: this.handleInputChange,
            required: true
          })), /*#__PURE__*/
        React.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/
          React.createElement("label", {
            htmlFor: "email"
          }, "Email:"), /*#__PURE__*/
          React.createElement("input", {
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Email",
            value: this.state.email,
            onChange: this.handleInputChange,
            required: true
          })), /*#__PURE__*/
        React.createElement("div", {
          className: "form-group"
        }, /*#__PURE__*/
          React.createElement("label", {
            htmlFor: "message"
          }, "Message:"), /*#__PURE__*/
          React.createElement("textarea", {
            id: "message",
            name: "message",
            placeholder: "Type Your Message",
            value: this.state.message,
            onChange: this.handleInputChange,
            required: true
          })), /*#__PURE__*/
        React.createElement("button", {
          type: "submit", id: "submit-btn"
        }, "Submit")));
  }}


class ContactSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const {
      contact
    } = props;
    let TagLine;
    if (typeof contact == "object") {
      TagLine = contact.tagline;
    }
    return /*#__PURE__*/(
      React.createElement("section", {
        id: "contact"
      }, /*#__PURE__*/
        React.createElement("h2", null, "Contact"), /*#__PURE__*/
        React.createElement("div", {
          className: "content"
        }, /*#__PURE__*/
          React.createElement("div", {
            id: "tag-line", className: "text-gradient"
          }, /*#__PURE__*/
            React.createElement("h2", null, TagLine)), /*#__PURE__*/
          React.createElement("div", {
            id: "form-container",
            className: `${
            props.scrollTop >= props.scrollHeight ? "slideRight": "shiftLeft"
            }`
          }, /*#__PURE__*/

            React.createElement(ContactForm, null)))));
  }}

class Footer extends React.Component {
  render() {
    const {
      profiles
    } = this.props;

    return /*#__PURE__*/(
      React.createElement("footer", {
        id: "footer"
      }, /*#__PURE__*/
        React.createElement("div", {
          className: "footer-links"
        },
          profiles &&
          profiles.map(profile => {
            return /*#__PURE__*/(
              React.createElement("a", {
                href: profile.url, key: profile.name
              }, /*#__PURE__*/
                React.createElement("i", {
                  className: `${profile.fontAwesomeClass} footer-icon`
                })));
          })), /*#__PURE__*/

        React.createElement("p", null,
          " ", "Built with ", /*#__PURE__*/
          React.createElement("i", {
            className: "fa fa-heart",
            style: {
              color: "#fcb4e1"
            }
          }),
          " ", "using",
          " ", /*#__PURE__*/
          React.createElement("i", {
            className: "fa-brands fa-react",
            style: {
              fontSize: "1.5rem",
              color: "#47cbfe",
              transform: "translateY(4px)"
            }
          }),

          " "), /*#__PURE__*/
        React.createElement("br", null), /*#__PURE__*/
        React.createElement("div", {
          className: "copy"
        }, /*#__PURE__*/
          React.createElement("p", null, /*#__PURE__*/
            React.createElement("i", {
              className: "fa fa-copyright"
            }), " Copyright Sonu Shivcharan"))));

  }}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
