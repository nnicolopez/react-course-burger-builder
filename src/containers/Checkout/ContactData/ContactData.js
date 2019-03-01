import React, { Component } from 'react';

import axios from '../../../axios-orders';

import classes from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: this.formFieldInit('input', 'text', 'Name', ''),
            street: this.formFieldInit('input', 'text', 'Address', ''),
            zipCode: this.formFieldInit('input', 'text', 'Zip Code', ''),
            country: this.formFieldInit('input', 'text', 'Country', ''),
            email: this.formFieldInit('input', 'email', 'Email', ''),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        loading: false
    }

    formFieldInit (tag, type, placeholder, value) {
        return {
            elementType: tag,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }        

        let form = (
            <form>
                {formElementsArray.map(formElem => (
                    <Input 
                        key={formElem.id}
                        elementType={formElem.config.elementType} 
                        elementConfig={formElem.config.elementConfig} 
                        value={formElem.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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