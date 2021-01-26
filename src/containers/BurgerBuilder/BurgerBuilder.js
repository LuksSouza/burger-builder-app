import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ ingredients: response.data }))
            .catch(error => this.setState({ error: true }));
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount === 0) {
            return;
        }

        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients)
            .map(key => {
                return updatedIngredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    };

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            costumer: {
                name: 'Lucas Souza',
                address: {
                    street: 'Test Street',
                    zipCode: '2745-271',
                    country: 'Portugal'
                },
                email: 'lucas-machado@outlook.com',
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }));
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        ordered={this.purchasingHandler}
                        purchasable={this.state.purchasable} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice} />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);