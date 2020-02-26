import React, { Component } from 'react';
import { Modal, Button, Icon, Form } from 'semantic-ui-react';



export class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
    
        
    }

    deleteCustomer(customerId) {
       
        fetch('https://localhost:44328/api/customers' + customerId, {

    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },

       })
 }

            
    state = { deleteModal: false }

    render() {
        const { deleteModal } = this.state;

    
        return (

            <div >
                <Modal
                    open={deleteModal}
                    onClose={this.closeDeleteModal}
                    trigger={<Button onClick={() => this.setState({ deleteModal: true })} color='red'><Icon name='trash' />Delete</Button>}
                    style={{
                        height: '15rem',
                        position: 'relative'
                    }}
                >
                    <Modal.Header>Delete Customer Records</Modal.Header>
                    <Modal.Content>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>

                                     
                                    <Form.Field>
                                        <label>Are you sure?</label>
                                    </Form.Field>

                            </Form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button secondary onClick={() => this.setState({ deleteModal: false })} inverted >Close</Button>
                        <Button className="mr-2"  color="red" onClick={() => this.deleteCustomer(this.props.customerId)}>Delete</Button>
                   
                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}





