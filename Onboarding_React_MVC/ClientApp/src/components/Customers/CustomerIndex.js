import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button, Icon} from 'semantic-ui-react';
import { CreateCustomer } from './CreateCustomer';
import { EditCustomer } from './EditCustomer';
//import { DeleteCustomer } from './DeleteCustomer';


export class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = { custs: [], id: 0 };
      
    }

    //This method will be executed when all the components has been rendered.
    componentDidMount() {
        this.refreshList();
    }
    refreshList() {

        fetch('https://localhost:44328/api/customers')
            .then(response => response.json())
            .then(data => {
                this.setState({ custs: data });
            }
            );

    }

    //componentDidMount executed when the property is changed
    componentDidUpdate() {
        this.refreshList();
    }

   

    deleteCustomer(customerId) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44328/api/customers/' + customerId, {

                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
        }
    }

   
    render() {

        const { custs } = this.state;
        const { editModal } = this.state;
        let closeModal = () => this.setState({ showModal: false });
        let closeEditModal = () => this.setState({ editModal: false });
        // let closeDeleteModal = () => this.setState({ deleteModal: false });
        return (
            <div>
                <h4>Customer Index</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {custs.map(cust =>
                            <Table.Row key={cust.id}>
                                <Table.Cell>{cust.id}</Table.Cell>
                                <Table.Cell>{cust.name}</Table.Cell>
                                <Table.Cell>{cust.address}</Table.Cell>
                                <Table.Cell>
                                   <Button.Group>
                                        <EditCustomer
                                            show={this.state.editModalOpen}
                                            onClose={closeEditModal}

                                            customerId={cust.id}
                                            customerName={cust.name}
                                            customerAddress={cust.address}
                                        />
                                    </Button.Group>

                                </Table.Cell>
                                <Table.Cell>
                                    < Button className="mr-2" color="red" onClick={() => this.deleteCustomer(cust.id)}><Icon name='trash' />Delete</Button>

                                </Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
                <Button.Group >
                    <CreateCustomer
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
                </Button.Group>



            </div>

        )

    }
}


//<DeleteCustomer
//    show={this.state.deleteModal}
//    onClose={closeDeleteModal}
//    customerId={cust.id}



