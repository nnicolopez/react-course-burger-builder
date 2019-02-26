import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders});
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients} />
                ))}
            </div>
        );
    }
}

export default errorHandler(Orders, axios);