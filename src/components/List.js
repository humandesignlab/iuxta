import _ from "lodash";
import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { OperationHelper } from "apac";

// const tableData = [
//   { name: "John", age: 15, gender: "Male" },
//   { name: "Amber", age: 40, gender: "Female" },
//   { name: "Leslie", age: 25, gender: "Female" },
//   { name: "Ben", age: 70, gender: "Male" }
// ];

class TableList extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  search() {
    const opHelper = new OperationHelper({
      awsId: "AKIAJ2GZ3RUZ5ZL5D25Q",
      awsSecret: "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",
      assocId: "iuxtapos09-20",
      locale: "MX"
    });

    opHelper
      .execute("ItemSearch", {
        SearchIndex: "All",
        Keywords: "Kleenex Cottonelle Beauty Care",
        ResponseGroup: "ItemAttributes,Offers"
      })
      .then(response => {
        this.setState({ data: response.result.ItemSearchResponse.Items.Item });
        return;
      })
      .catch(err => {
        console.error("Something went wrong! ", err);
      });
  }

  componentDidMount = () => {
    this.search();
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });
      console.log("this.state ", this.state);
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;
    console.log("data ", data);
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "Brand" ? direction : null}
              onClick={this.handleSort("Brand")}
            >
              Brand
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "Title" ? direction : null}
              onClick={this.handleSort("Title")}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "ListPrice" ? direction : null}
              onClick={this.handleSort("ListPrice")}
            >
              ListPrice
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{item.ItemAttributes.Brand}</Table.Cell>
                <Table.Cell>{item.ItemAttributes.Title}</Table.Cell>
                <Table.Cell>
                  {item.OfferSummary.LowestNewPrice.FormattedPrice}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}
export default TableList;
