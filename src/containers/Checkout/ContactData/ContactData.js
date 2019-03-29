import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import classes from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
            name: this.formFieldInit('input', 'text', 'Name', '', {required: true}),
            street: this.formFieldInit('input', 'text', 'Address', '', {required: true}),
            zipCode: this.formFieldInit('input', 'text', 'Zip Code', '', {required: true, minLength: 5, maxLength: 5}),
            country: this.formFieldInit('input', 'text', 'Country', '', {required: true}),
            email: this.formFieldInit('input', 'email', 'Email', '', {required: true}),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    formFieldInit (tag, type, placeholder, value, validationRules) {
        return {
            elementType: tag,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: validationRules,
            valid: false,
            touched: false
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let identifier in this.state.orderForm) {
            orderData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid &= value.trim() !== '';
        }
        if (rules.minLength) {
            isValid &= value.length >= 5;
        }
        if (rules.maxLength) {
            isValid &= value.length <= 5;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const orderForm = {...this.state.orderForm};
        const formElem = {...orderForm[inputIdentifier]};
        formElem.value = event.target.value;
        formElem.valid = this.checkValidity(formElem.value, formElem.validation);
        formElem.touched = true;
        orderForm[inputIdentifier] = formElem;

        let formIsValid = true;
        for (let inputIdentifier in orderForm) {
            formIsValid &= orderForm[inputIdentifier].valid;
        }

        this.setState({orderForm, formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElem => (
                    <Input
                        key={formElem.id}
                        elementType={formElem.config.elementType}
                        elementConfig={formElem.config.elementConfig}
                        value={formElem.config.value}
                        valid={formElem.config.valid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElem.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));