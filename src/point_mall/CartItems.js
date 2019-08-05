import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';
import { withRouter } from 'react-router-dom';


class CartItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CartItems: [],
            purchaseItemsQueue: []
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems = () => {
        let CartItems = localStorage.getItem('cart_items');
        if (CartItems == null || CartItems.length < 1) {
            CartItems = [];
        } else {
            CartItems = JSON.parse(CartItems);
        }
        this.setState({
            CartItems
        });
    }

    purchase = () => {
        const itemsQueue = [];
        for (let CartItem of this.state.CartItems) {
            for (let i = 0; i < CartItem.count; i++) {
                itemsQueue.push(CartItem.item.id);
            }
        }
        this.setState({
            purchaseItemsQueue: itemsQueue
        });
        this.purchaseNextItem(itemsQueue);
    }

    purchaseNextItem(itemsQueue) {
        if (itemsQueue.length < 1) {
            localStorage.setItem('cart_items', '[]');
            this.props.history.push('/me/items');
        } else {
            const itemId = itemsQueue.shift();
            axios.post(
                'http://localhost:8003/items/' + itemId + '/purchase/',
                {},
                {
                    headers: {
                        'Authorization': localStorage.getItem('authorization')
                    }
                }
            ).then((response) => {
                this.purchaseNextItem(itemsQueue);
            });
        }
    }

    render() {
        const items = this.state.CartItems.map((CartItems) => {
            const item = CartItems.item;
            return (
                <ItemBox key={item.id} item={item} count={CartItems.count} />
            )
        });

        return (
            <div id="container">
                <h1>장바구니</h1>
                <button onClick={this.purchase}>구입</button>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default withRouter(CartItems);