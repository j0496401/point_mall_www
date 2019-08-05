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
        const items = [];
        for (let CartItem of this.state.CartItems) {
            items.push({
                item_id : CartItem.item.id,
                count : CartItem.count
            });
        }
        axios.post(
            'http://localhost:8003/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            localStorage.removeItem('cart_items');
            this.props.history.push('/me/items');
        });
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