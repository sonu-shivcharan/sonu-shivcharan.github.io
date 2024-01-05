class AboutMeSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    const {
      description
    } = props.aboutMe;
    const imgUrl = props.isLoaded ? props.aboutMe.profileImg.url: " ";
    const headLine = props.isLoaded ? props.aboutMe.headLine: " ";

    return /*#__PURE__*/(
      React.createElement("section", {
        id: "about-me-section"
      }, /*#__PURE__*/
        React.createElement("h2", {
          className: "text-gradient"
        }, "About Me"), /*#__PURE__*/
        React.createElement("div", {
          className: `about-me-content ${
          props.scrollTop >= 230 ? "slideUp": "shiftDown"
          }`
        }, /*#__PURE__*/

          React.createElement("div", {
            className: "flex", style: {
              flexDirection: "column"
            }
          }, /*#__PURE__*/
            React.createElement("div", {
              className: `profile-picture ${
              this.props.scrollTop >= 230 ? "slideUp": "shiftDown"
              }`
            }, /*#__PURE__*/

              React.createElement("img", {
                src: imgUrl
              })), /*#__PURE__*/

            React.createElement("div", {
              className: "flex name-and-headline"
            }, /*#__PURE__*/
              React.createElement("h2", {
                className: "name"
              }, "Sonu Shivcharan"), /*#__PURE__*/
              React.createElement("p", {
                className: "headline"
              }, headLine), /*#__PURE__*/
              React.createElement("div", {
                className: "flex links"
              }, /*#__PURE__*/
                React.createElement("a", {
                  href: "https://linkedin.com/in/sonushivcharan",
                  target: "_blank",
                  style: {
                    textDecoration: "none"
                  }
                }, /*#__PURE__*/

                  React.createElement("span", {
                    className: "connect"
                  }, "Connect +", /*#__PURE__*/
                    React.createElement("span", {
                      className: "tool-tip"
                    }, "On LinkedIn")),
                  " "), /*#__PURE__*/

                React.createElement("span", {
                  id: "share-icon", onClick: this.props.updateState
                }, /*#__PURE__*/
                  React.createElement("i", {
                    className: "fa fa-share-nodes",
                    style: {
                      color: "#2ca2ff"
                    }
                  }),
                  " ")))), /*#__PURE__*/
          React.createElement("div", {
            className: `about ${
            this.props.scrollTop >= 250 ? "slideUp": "shiftDown"
            }`
          },

            description &&
            description.map((item, index) => /*#__PURE__*/React.createElement("p", {
              key: "p" + index
            }, item))))));

  }}
export default AboutMeSection;