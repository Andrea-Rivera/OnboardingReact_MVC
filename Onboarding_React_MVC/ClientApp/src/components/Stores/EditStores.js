import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export class EditStores extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert(event.target.name.value + event.target.address.value )
        fetch('https://localhost:44328/api/stores/' + this.props.storeId, {
            method: 'PUT',
            headers: {
               
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Id": event.target.id.value,
                "Name": event.target.name.value,
                "Address": event.target.address.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Store updated successfully!');
            },
                (error) => {

                    alert('Failed')
                }
            )
    }

    state = { showEditModal: false }

    render() {
        const { showEditModal } = this.state;


        return (
            <div >
                <Modal
                    open={showEditModal}
                    onClose={this.showEditModal}
                    trigger={<Button color="olive" onClick={() => this.setState({ showEditModal: true, Id: this.props.storeId, Name: this.props.storeName, Address: this.props.storeAddress })} color="yellow">Edit</Button>} >
                    <Modal.Header >Edit Store</Modal.Header>
                    <Modal.Content>
                        <div className="container">

                            <Form onSubmit={this.handleSubmit}>

                        
                                    <Form.Field >
                                    <label>Id</label>
                                    <input placeholder='Store Id' name="id" defaultValue={this.props.storeId} disabled />
                                    </Form.Field>
                       

                          
                                    <Form.Field >
                                        <label>Name</label>
                                    <input placeholder='Store Name' name="name" defaultValue={this.props.storeName} required />
                                    </Form.Field>
                       

                           
                                    <Form.Field>
                                        <label>Store Address</label>
                                    <input placeholder='Store Address' name="address" defaultValue={this.props.storeAddress} required />
                                    </Form.Field>
                    

                           
                                    <Form.Field>
                                        <Button type='submit' color="blue">Update Store details</Button>
                                    </Form.Field>
                             

                            </Form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions >
                        <Button onClick={() => this.setState({ showEditModal: false })} > Close</Button>


                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}



