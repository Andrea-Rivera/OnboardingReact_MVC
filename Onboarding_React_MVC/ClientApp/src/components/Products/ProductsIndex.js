import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button, Icon } from 'semantic-ui-react';
import { CreateProduct } from './CreateProduct';

export class Products extends Component {

    constructor(props) {
        super(props);
        this.state = { prods: [] };

    }

    //This method will be executed when all the components has been rendered.
    componentDidMount() {
        this.refreshList();
    }


    refreshList() {

        fetch('https://localhost:44328/api/products')
            .then(response => response.json())
            .then(data => {
                this.setState({ prods: data });
            }
            );

    }

    //componentDidMount executed when the property is changed
    componentDidUpdate() {
        this.refreshList();
    }

        ////////DELETE////////////////////////////////////////////////////
    deleteProduct(productId) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44328/api/products/' + productId, {

                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
        }
    }


    render() {
        const { prods } = this.state;
        let closeModal = () => this.setState({ showModal: false });

        return (
            <div>
                <h4>Product Index</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>

                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Price ($)</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {prods.map(prod =>
                            <Table.Row key={prod.id}>

                                <Table.Cell>{prod.name}</Table.Cell>
                                <Table.Cell>{prod.price}</Table.Cell>
                                <Table.Cell>

                                    

                                </Table.Cell>
                                <Table.Cell>
                                    < Button className="mr-2" color="red" onClick={() => this.deleteProduct(prod.id)}><Icon name='trash' />Delete</Button>

                                </Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
                <Button.Group >
                    <CreateProduct
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
                </Button.Group>
               


            </div>

        )

    }
}



