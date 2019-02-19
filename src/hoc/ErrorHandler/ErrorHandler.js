import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(req => req, error => {
                this.setState({error});
            });
        }
        state = {
            error: null
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
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