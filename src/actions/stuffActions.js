import * as types from "./actionTypes";
import { OperationHelper } from "apac";

export function receiveStuff(json) {
  return { type: types.RECEIVE_STUFF, stuff: [json] };
}

export function fetchStuff(searchTerm) {
  return dispatch => {
    const opHelper = new OperationHelper({
      awsId: "AKIAJ2GZ3RUZ5ZL5D25Q",
      awsSecret: "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",
      assocId: "iuxtapos09-20",
      locale: "MX"
    });

    opHelper
      .execute("ItemSearch", {
        SearchIndex: "All",
        Keywords: searchTerm,
        ResponseGroup: "ItemAttributes"
      })
      .then(response => {
        console.log("response ", response.result);
        return response.result.ItemSearchResponse.Items.Item;
      })
      .then(json => dispatch(receiveStuff(json)))
      .catch(err => {
        console.error("Something went wrong! ", err);
      });
  };
}
