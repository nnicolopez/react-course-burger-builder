import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: this.formFieldInit('input', 'email', 'Email', '', {required: true, isEmail: true}),
            password: this.formFieldInit('input', 'password', 'Password', '', {required: true, minLength: 6})
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        this.setState({controls: updatedControls});
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
            isValid &= value.length >= rules.minLength;
        }
        if (rules.maxLength) {
            isValid &= value.length <= rules.maxLength;
        }
        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElem => (
            <Input
                key={formElem.id}
                elementType={formElem.config.elementType}
                elementConfig={formElem.config.elementConfig}
                value={formElem.config.value}
                valid={formElem.config.valid}
                shouldValidate={formElem.config.validation}
                touched={formElem.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElem.id)} />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);