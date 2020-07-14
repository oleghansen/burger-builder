import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
     }

     orderHandler = (event) => {
         event.preventDefault();
        
            this.setState({loading: true});

            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: {
                    name: 'Ole',
                    address: {
                        street: 'Skogstjernevegen 40',
                        zipCode: '2322',
                        country: 'Norway'
                    },
                    email: 'ole@ole.com',
                    deliveryMethod: 'fastest'
                }
            }

            axios.post('/orders.json', order)
             .then(() => {
                 this.setState({loading: false});
                 this.props.history.push('/');
             })
             .catch(error => {
                 this.setState({loading: false});
                 console.log(error);
             });

         
     }

    render() { 
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="Email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
            <input className={classes.Input} type="text" name="postalCode" placeholder="Postal code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
 
export default ContactData;
