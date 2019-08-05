import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import DataHelper from '../DataHelper'

class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories(){
        Axios.get(DataHelper.baseURL() + '/categories')
        .then((Response) => {
            const categories = Response.data;
            this.setState({
                categories: categories
            });
        });
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });
        return (
            <header>
                <Link to="/">PointMall</Link>
                {categories}

                <div className="header-right">
                    <Link to="/cart/items">Cart</Link>
                    <Link to="/me/items">My Items</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}

export default Header;