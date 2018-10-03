import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as stuffActions from "../actions/stuffActions";
import PropTypes from "prop-types";
import React from "react";
import { Table, Menu, Dropdown, Input, Button } from "semantic-ui-react";

class StuffList extends React.Component {
  state = {
    inputValue: ""
  };
  componentWillMount() {
    // HERE WE ARE TRIGGERING THE ACTION
    this.props.stuffActions.fetchStuff("");
  }

  updateInputValue = evt => {
    this.setState({
      inputValue: evt.target.value
    });
  };

  handleSubmit = () => {
    this.props.stuffActions.fetchStuff(this.state.inputValue);
  };

  renderData() {
    console.log("this.props ", this.props.stuff[0]);
    return (
      <div>
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
              <Input
                type="text"
                placeholder="Search..."
                action
                onChange={this.updateInputValue}
              >
                <input />
                <Button type="submit" onClick={this.handleSubmit}>
                  Search
                </Button>
              </Input>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Brand</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>ListPrice</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stuff[0] !== undefined ? (
              this.props.stuff[0].map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{item.ItemAttributes.Brand}</Table.Cell>
                    <Table.Cell>{item.ItemAttributes.Title}</Table.Cell>
                    <Table.Cell>
                      {item.ItemAttributes.ListPrice !== undefined
                        ? item.ItemAttributes.ListPrice.FormattedPrice
                        : "No Price available"}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <div className="">No Data</div>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div className="">
        {this.props.stuff.length > 0 ? (
          this.renderData()
        ) : (
          <div className="">No Data, check spelling.</div>
        )}
      </div>
    );
  }
}

StuffList.propTypes = {
  stuffActions: PropTypes.object,
  stuff: PropTypes.array
};

function mapStateToProps(state) {
  return {
    stuff: state.stuff
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stuffActions: bindActionCreators(stuffActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StuffList);
