class Footer extends React.Component {
  render() {
    const {profiles} = this.props;

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
              color: "#ff4889",
              fontSize:"1.5rem",
              transform: "translateY(4px)"
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
export default Footer;