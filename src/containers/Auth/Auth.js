import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {
    state = {
        controls: {
            email: this.formFieldInit('input', 'email', 'Email', '', {required: true, isEmail: true}),
            password: this.formFieldInit('input', 'password', 'Password', '', {required: true, minLength: 6})
        },
        isSignup: true
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
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElem => (
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

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);