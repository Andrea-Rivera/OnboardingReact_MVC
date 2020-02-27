import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button, Icon } from 'semantic-ui-react';



export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = { sales: [], id:1};
       
    }

   



    //This method will be executed when all the components has been rendered.
    componentDidMount() {
        this.refreshList();
    }


    refreshList() {
       
        fetch('https://localhost:44328/api/sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sales: data });
            }
            );

    }

    //componentDidMount executed when the property is changed
    componentDidUpdate() {
        this.refreshList();
    }



    deleteCustomer(salesId) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44328/api/sales/' + salesId, {

                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
        }
    }


  

    render() {
      
        const { sales } = this.state;
        
        return (
            <div>
                <h4>Customer Index</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                         
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                           
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {sales.map(sale =>
                            <Table.Row key={sale.id}>
                                <Table.Cell>{sale.customerId}</Table.Cell>
                                <Table.Cell>{sale.productId}</Table.Cell>
                                <Table.Cell>{sale.storeId}</Table.Cell>
                                <Table.Cell>
                                    < Button className="mr-2" color="red" onClick={() => this.deleteCustomer(sale.id)}><Icon name='trash' />Delete</Button>
                                </Table.Cell>
                                
                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
               

               

            </div>

        )

    }
}

