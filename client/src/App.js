import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryRenderer, commitMutation } from 'react-relay';
import env from './environment';
import graphql from 'babel-plugin-relay/macro';
import randomWords from 'random-words'
import {ConnectionHandler} from 'relay-runtime';



class App extends React.Component {

    componentDidMount() {
        console.log('MOUNT');
    }

    componentWillUnmount() {
        console.log('UNMOUNT');
    }

    componentDidUpdate() {
        console.log('UPDATE');
    }

    createProduct = () => {
        const updater = (store) => {
            const payload = store.getRootField('createProduct');
            if(payload === null) {
                return;
            }

            const productBrand = store.get('/api/product_brands/1');
            const existingProducts = productBrand.getLinkedRecords('products') || [];
            const newProduct = payload.getLinkedRecord('product');

            const newProducts = [...existingProducts, newProduct];
            productBrand.setLinkedRecords(newProducts, 'products');
            const con = ConnectionHandler.getConnection(productBrand, 'App_products');

            const edge = ConnectionHandler.createEdge(store, con, newProduct, 'productsEdge');

            ConnectionHandler.insertEdgeBefore(con, edge);
        };

        const mutation = graphql`
            mutation AppAddProductMutation(
                $input: createProductInput!
            ) {
                createProduct(input: $input) {
                    product {
                        name
                    }
                }
            }
        `;

        commitMutation(
            env,
            {
                mutation,
                variables: {
                    input: {
                        productBrand: "/api/product_brands/1",
                        name: randomWords()
                    }
                },
                updater
            },
        );
    }

    showBrands = () => {
        if(this.props.productBrands.edges.length === 0) {
            return (<strong>No productbrands</strong>);
        }
        else {
            return (
                <div>
                    <strong>Product brand 1 is {this.props.productBrands.edges[0].node.name}</strong>
                    <p>It has {this.props.productBrands.edges[0].node.products.edges.length} products.</p>
                    <p>Namely</p>
                    <ul>
                        {this.props.productBrands.edges[0].node.products.edges.map((edge) => {
                            return (<li key={edge.node.id}>{edge.node.name}</li>);
                        })
                        }
                    </ul>
                </div>
            );
        }
    }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Relay test</h1>

            <img src={logo} className="App-logo" alt="logo" />
              {this.showBrands()}

              <a onClick={() => this.createProduct()}>Add product</a>
          </header>
        </div>
    );
  }
}


const query = graphql`
  query AppQuery
  {
    productBrands(first: 100) {
      edges {
        node {
          name,
          products(first: 100) @connection(key: "App_products") {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;


export default class QRApp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <QueryRenderer
        environment={env} //Here is the enviroment that we configured before
        query={query} //And here goes your GraphQL query
        variables={{}}
        render={
          ({error, props}) => {
            if (error) {
              //Here we pass our error view in case of query errors or fetch failture
              console.log('error: ', error);
            }
            else if (props) {
              //Here we pass our component that should be rendered

              return (<App {...props}/>);
            }
            //Here goes our activity indicator or loading view
            console.log('activity indicator of Product Screen');
          }
        }
    />;
  }
}