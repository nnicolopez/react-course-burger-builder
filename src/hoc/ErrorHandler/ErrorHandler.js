import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(req => req, error => {
                this.setState({error});
            });
        }
        state = {
            error: null
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <>
                    <Modal show={this.state.error} modalClose={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default errorHandler;