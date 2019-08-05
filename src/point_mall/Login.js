import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
            'http://localhost:8003/o/token/',
                {
                    "grant_type": "password",
                    "client_id": "j51MYqWX7AQmb8vt5sfuG40RRI7uWzUmcGtmtb3j",
                    "username": this.state.username,
                    "password": this.state.password
                }
            ).then((Response) => {
                const token = Response.data;
                localStorage.setItem('authorization', token.token_type + ' ' + token.access_token);
                this.props.history.push('/');
        });
        // const authorization = 'Basic ' + btoa(this.state.username + ":" + this.state.password);
        // localStorage.setItem("authorization", authorization);
        // this.props.history.push('/');
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