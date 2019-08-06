import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import DataHelper from '../DataHelper'
import { observer } from 'mobx-react';
import { inject } from 'mobx-react';

@inject('authStore')
@observer
class Header extends React.Component{

    helper = new DataHelper();
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.helper.isLoggedIn,
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

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }
    
    render() {
        const { authStore } = this.props;
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
                    {
                        authStore.isLoggedIn && <Link to="/me/items">My Items</Link>
                    }                    
                    {
                        authStore.isLoggedIn ?
                        <button onClick={this.logout}> Logout </button> :
                        <Link to="/login">Login</Link>
                    }
                </div>
            </header>
        );
    }
}

export default Header;