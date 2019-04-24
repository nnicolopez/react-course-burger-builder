import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const isPurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disableInfo = {...props.ings};

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingedients can't be loaded</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disableInfo}
          price={props.price}
          purchasable={isPurchasable(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated} />
      </>
    );

    orderSummary = <OrderSummary
      continue={purchaseContinueHandler}
      cancel={purchaseCancelHandler}
      ingredients={props.ings}
      price={props.price} />;
  }

  return (
    <>
      <Modal show={purchasing} modalClose={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(burgerBuilder, axios));