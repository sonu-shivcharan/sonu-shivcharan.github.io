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
export default SharePanel;