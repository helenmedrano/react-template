const React = require("react");

class MockSvgIcon extends React.Component {
  render() {
    return <svg {...this.props} />;
  }
}

module.exports = MockSvgIcon;
