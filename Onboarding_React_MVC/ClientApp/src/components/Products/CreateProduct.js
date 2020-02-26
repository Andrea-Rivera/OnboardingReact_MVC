import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';



export class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: null,
        };
    }


    handleSubmit(event) {
        event.preventDefault();
        //alert(event.target.name.value + event.target.price.value);
        fetch('https://localhost:44328/api/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                name: event.target.name.value,
               // price: event.target.price.value
            
                 
            })
        })
            .then(res => res.json())
    }        

    state = { showModal: false }

    render() {
        const { showModal } = this.state;


        return (
            <div >
                <Modal
                    open={showModal}
                    onClose={this.closeModal}
                    trigger={<Button onClick={() => this.setState({ showModal: true })} primary>New Product</Button>}
                    style={{
                        height: '26rem',
                        position: 'relative'
                    }}>
                    <Modal.Header >New Product</Modal.Header>
                    <Modal.Content>
                        <div className="container">
                            <Form onSubmit={this.handleSubmit}>

                                    <Form.Field >
                                        <label>Product Name</label>
                                        <input placeholder='Product Name' name="name" required />
                                    </Form.Field>
                              

                              
                                    <Form.Field>
                                        <label>Product Price</label>
                                        <input placeholder=' Product Price' name="price" required />
                                    </Form.Field>
                              
                                
                                    <Form.Field>
                                        <Button type='submit' primary>Add  Product Details</Button>
                                    </Form.Field>
                            </Form>
                        </div>
                    </Modal.Content>
                    <Modal.Actions >
                        <Button onClick={() => this.setState({ showModal: false })} > Close</Button>


                    </Modal.Actions>
                </Modal>
            </div>

        )
    }
}

