/*

Make this component work like a normal <select><option/></select>.

1. Get the label to display correctly.

Tips:
- You can use React.Children.map or React.Children.forEach to iterate over
  the children to find the child with a value that matches the value in state.
- the `child` is an object you can inspect, like `child.props.value` and
  `child.props.children`

2. When you click the button the menu should open

3. When you click an option the component should close and update the value in
   state

*/

import React from "react";

class Select extends React.Component {
  state = {
    isOpen: false,
    value: this.props.defaultValue
  };

  toggleSelect = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  optionClick = value => {
    this.setState({ isOpen: false, value: value });
  };
  render() {
    const { isOpen } = this.state;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        value: child.props.children,
        optionClick: value => this.optionClick(value)
      });
    });
    return (
      <div className="select">
        <button className="label" onClick={this.toggleSelect}>
          {this.state.value} <span className="arrow">▾</span>
        </button>
        {isOpen && <ul className="options">{children}</ul>}
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    const { optionClick, children, value } = this.props;
    return (
      <li className="option" value={value} onClick={() => optionClick(value)}>
        {children}
      </li>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Select / Option</h2>
          <Select defaultValue="tikka-masala">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default App;
