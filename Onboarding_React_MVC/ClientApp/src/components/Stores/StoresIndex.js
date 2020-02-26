import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { Button, Icon,Modal} from 'semantic-ui-react';
import { CreateStores} from './CreateStores';

export class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = { stors: [] };
        /////////////////edit////////////////////////////////////////////
        this.updateStore = this.updateStore.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStoreChanges = this.handleStoreChanges.bind(this);
        ///////////////////////////////////////////////////////////////////
    }

    //This method will be executed when all the components has been rendered.
    componentDidMount() {
        this.refreshList();
    }


    refreshList() {

        fetch('https://localhost:44328/api/stores')
            .then(response => response.json())
            .then(data => {
                this.setState({ stors: data });
            }
            );

    }

    //componentDidMount executed when the property is changed
    componentDidUpdate() {
        this.refreshList();
    }


    deleteStore(storeId) {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44328/api/stores/' + storeId, {

                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            })
        }
    }
    ////////////////////EDIT/////////////////////////////////////

    state = { editModalOpen: false }

    handleNameChange = (event) => this.setState({ name: event.target.value })

    updateStore = (id, saleName, saleAddress) => this.setState({ name: saleName, storeId: id, address: saleAddress, editModalOpen: true })

    

    handleStoreChanges(storeId) {

        console.log("retrieved value: " + this.state.name + " Address : " + this.state.address + " Id : " + this.state.storeId);

        fetch('https://localhost:44328/api/stores' + storeId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: this.state.saleId,
                name: this.state.name,
                address: this.state.address
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Stores added successfully!');
            },
                (error) => {

                    alert('Failed')
                }
            )
    }
        
    

    ////////////////////////////////////////////////////////////////
    render() {
        const { editModalOpen } = this.state;
        const { stors } = this.state;
        let closeModal = () => this.setState({ editModalOpen: false });
    
        return (
            <div>
                <h4>Store Index</h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                 
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
           
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {stors.map(stor =>
                            <Table.Row key={stor.id}>
                               
                                <Table.Cell>{stor.name}</Table.Cell>
                                <Table.Cell>{stor.address}</Table.Cell>
                                <Table.Cell>
                                    <Modal trigger={<Button onClick={() => this.setState({ editModalOpen: true })} color='olive' ><Icon name='edit' />Edit</Button>} open={this.state.editModalOpen}
                                        onOpen={() => this.updateStore(stor.id, stor.name, stor.address)}

                                        style={{
                                            height: "auto",
                                            top: "auto",
                                            left: "auto",
                                            bottom: "auto",
                                            right: "auto"
                                        }}>
                                
                                        <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />

                                        <Button color="olive" onClick={() => this.handleStoreChanges(stor.id)}><Icon name='check' />Update</Button>
                                        <Button onClick={() => this.setState({ editModalOpen: false })} > Close</Button>
                                
                                    </Modal>

                                </Table.Cell>
                                <Table.Cell>
                                    < Button className="mr-2" color="red" onClick={() => this.deleteStore(stor.id)}><Icon name='trash' />Delete</Button>
                                  

                                </Table.Cell>
                            </Table.Row>
                        )}

                    </Table.Body>
                </Table>
                <Button.Group >
                    <CreateStores
                        show={this.state.showModal}
                        onClose={closeModal}
                    />
                </Button.Group>



            </div>

        )

    }
}

