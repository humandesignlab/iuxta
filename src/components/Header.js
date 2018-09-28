import React, { Component } from "react";
import { Menu, Dropdown, Input } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <Menu stackable className="fixed">
        <Menu.Item className="item">Iuxta</Menu.Item>
        <Dropdown item text="Categories">
          <Dropdown.Menu>
            <Dropdown.Item>Electronics</Dropdown.Item>
            <Dropdown.Item>Automotive</Dropdown.Item>
            <Dropdown.Item>Home</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
