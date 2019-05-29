/**
 * @flow
 * @relayHash a1f643735e6a9310585a931b2b56c272
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type createProductInput = {|
  name: string,
  productBrand: string,
  clientMutationId?: ?string,
|};
export type AppAddProductMutationVariables = {|
  input: createProductInput
|};
export type AppAddProductMutationResponse = {|
  +createProduct: ?{|
    +product: ?{|
      +name: string
    |}
  |}
|};
export type AppAddProductMutation = {|
  variables: AppAddProductMutationVariables,
  response: AppAddProductMutationResponse,
|};
*/


/*
mutation AppAddProductMutation(
  $input: createProductInput!
) {
  createProduct(input: $input) {
    product {
      name
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "createProductInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppAddProductMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProduct",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "createProductPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppAddProductMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProduct",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "createProductPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "product",
            "storageKey": null,
            "args": null,
            "concreteType": "Product",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "AppAddProductMutation",
    "id": null,
    "text": "mutation AppAddProductMutation(\n  $input: createProductInput!\n) {\n  createProduct(input: $input) {\n    product {\n      name\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd5b39fa536c521b46ee2e0ddcb995d50';
module.exports = node;
