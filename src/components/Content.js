import React, { Component } from "react";
import { Responsive, Container, Segment } from "semantic-ui-react";
import StuffList from "./StuffList";

class Content extends Component {
  render() {
    return (
      <div>
        <Responsive as={Container} minWidth={320} maxWidth={991}>
          <Segment>
            <StuffList />
          </Segment>
        </Responsive>
        <Responsive as={Container} {...Responsive.onlyComputer}>
          <Segment>
            <StuffList />
          </Segment>
        </Responsive>
      </div>
    );
  }
}

export default Content;
