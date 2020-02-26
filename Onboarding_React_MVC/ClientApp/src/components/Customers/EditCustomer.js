import React, { Component } from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';




export class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);

        this.state = { id: this.props.customerId, name: this.props.customerName, address: this.props.customerAddress };
    }

    updateCustomer = (id, customerName, customerAddress) => this.setState({ name: customerName, customerId: id, address: customerAddress, editModalOpen: true })
   
  
    handleSubmit(id) {


        console.log(this.state.name + this.state.address + this.state.customerId);

     

        fetch('https//localhost:44328/api/customers/EditCustomer/'+id, {

            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": this.state.name,
                "name": this.state.address,
                "address": this.state.customerId
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert('Customer updated successfully!');
            },
                (error) => {

                    alert('Failed')
                }
            )

    }
       
    
    state = { editModal: false }
    render() {
        const { editModal } = this.state;
        return (
            <div >
                <Modal
                    open={editModal}
                    onClose={this.closeModal}
                    trigger={<Button onClick={() => this.setState({ editModal: true })} color="olive"><Icon name='trash' />Edit</Button>}
                    onOpen={() => this.updateCustomer(this.props.customerId, this.props.name, this.props.address)}
                    style={{
                        height: '32rem',
                        position: 'relative'
                    }}>
                    <Modal.Header >Edit Customer</Modal.Header>
                    <Modal.Content>
                        <div className="container">
                            <Form onSubmit={() => this.handleSubmit(this.props.customerId)}>
                                <Form.Group controlid="id">  
                                    <Form.Field >
                                        <label>Id</label>
                                        <input type="text" name="id" value={this.state.id} onChange={(event) => this.setState({ id: event.target.value })} disabled />
                                    </Form.Field>      
                                </Form.Group>
                                <Form.Group controlid="name">
                                    <Form.Field >
                                        <label>Name</label>

                                        <input type="text" name="name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}  />
                                        
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group controlid="address">
                                    <Form.Field>
                                        <label>Customer Address</label>
                                        <input type="text" name="address" value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })}  />  
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group controlid="submit">
                                    <Form.Field>
                                        <Button type='submit' primary >Edit Customer details</Button>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions >
                        <Button onClick={() => this.setState({ editModal: false })} color="red"> Close</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

}



