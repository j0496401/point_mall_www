import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { inject } from 'mobx-react';
import DataHelper from '../DataHelper';

@inject('authStore')
class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: 'admin',
            password: '1234'
        };
    
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }

    login = () => {
        axios.post(
            DataHelper.baseURL() + '/o/token/',
                {
                    "grant_type": "password",
                    "client_id": "XIgzlkR36hyiaCrupPfE00gYU6ZZBzbhK2nJJNuZ",
                    "username": this.state.username,
                    "password": this.state.password
                }
            ).then((Response) => {
                const token = Response.data;
                const { authStore, history } = this.props;
                authStore.setToken(token);
                history.push('/');
        });
    }

    render() {
        return (
            <div>
                <div id="container">
                    <p>
                        <label>아이디</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.onInputChanged} />
                    </p>
                    <p>
                        <label>비밀번호</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onInputChanged} />
                    </p>
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);