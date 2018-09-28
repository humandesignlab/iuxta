import React, { Component } from "react";
import { Responsive, Container, Segment } from "semantic-ui-react";
import TableList from "./List";

class Content extends Component {
  render() {
    return (
      <div>
        <Responsive as={Container} minWidth={320} maxWidth={991}>
          <Segment>
            <TableList />
          </Segment>
        </Responsive>
        <Responsive as={Container} {...Responsive.onlyComputer}>
          <Segment>
            <TableList />
          </Segment>
        </Responsive>
      </div>
    );
  }
}

export default Content;
