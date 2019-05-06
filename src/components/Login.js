import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {},
            redirectToreferrer: false,
            credentials: this.props.location.credentials || []
        }
    }

    handleChange(field, e) {
        let errors = {}
        this.state[field] = e.target.value;
        this.setState({
            field: this.state[field]
        })
        if(this.state[field] == '') {
            errors[field] = field + ' cannot be empty';
        }
        this.setState({
            errors: errors
        })
        if (e.key && e.key == 'Enter') {
            this.login();
        }
    }
    validateCreds() {
        let errors = {}
        const { username, password } = this.state;

        if(username == '') {
            errors['username'] = 'Username cannot be empty';
        } if(password == '') {
            errors['password'] = 'Password cannot be empty';
        } 
        this.setState({
            errors: errors
        })
    }
    login() {
        // this.props.history.push('/home');
        const { username, password } = this.state;
        const creds = JSON.parse(localStorage.getItem('credentials'))

        let registerdUser = creds && creds.find(cred => cred.username === username);
        let successfulUser = creds && creds.find(cred => cred.username === username && cred.password === password);

        this.validateCreds();
        if(username!== '' && password!== '') {
            if(!registerdUser) {
                alert('User not registered !!')
            } else {
                if(successfulUser) {
                    localStorage.setItem('credentials', JSON.stringify(creds))
                    localStorage.setItem('currentUserSession', new Date());
                    this.setState(() => ({
                        redirectToreferrer: true
                    }))
                } else {
                    alert('Invalid credentials !!')
                }
            }
        }
    }
    
    registerUser() {
        const { username, password, credentials } = this.state;
        
        credentials.push({ username, password })
        localStorage.setItem('credentials', JSON.stringify(credentials))
        this.setState({
            username,
            password,
            credentials
        })
        alert('Registration successful\nPlease Login with your credentials !!');
    }

    register() {
        const { username, password } = this.state;
        const creds = JSON.parse(localStorage.getItem('credentials'))
        
        if(username!== '' && password!== '') {
            if(!creds) {
                this.registerUser()
            } else {
                let alreadyRegisterdUser = creds.find(cred => cred.username === username);
                if(!alreadyRegisterdUser) {
                    this.registerUser();
                } else {
                    alert('Username already exists')
                }
            }
        }
        this.validateCreds();
    }

    render() {
        const { redirectToreferrer, username, password, errors } = this.state

        if(redirectToreferrer === true) {
            return(
                <Redirect to={{
                    pathname: '/home',
                    username
                }} />
            )
        }
        
        const enabled = username.length > 0 && password.length > 0;

        return (
            <div id="container" align="center">
                <form className="loginForm">
                    <p className="title">User Name</p>
                    <input type="text" id="uname" className="textbox" value={username} size="10"
                        name="username" onChange={this.handleChange.bind(this, "username")} onKeyPress={this.handleChange.bind(this, "username")}/>
                    <span style={{color: "#ee6e73"}}>{errors["username"]}</span>
                    <p className="title">Password</p>
                    <input type="password" id="pwd" className="textbox" value={password} size="10"
                        name="password" onChange={this.handleChange.bind(this, "password")} onKeyPress={this.handleChange.bind(this, "password")}/>
                    <span style={{color: "#ee6e73"}}>{errors["password"]}</span>
                    <input type="button" onClick={this.register.bind(this)} value="REGISTER" className="btn btn-primary register" />
                    <input type="button" onClick={() => {this.login()}} disabled={!enabled} value="LOGIN" className="btn btn-primary loginBtn" />
                </form>
            </div>
        );
    }
}

const styles = {
    error: {
        color: '#ee6e73'
    }
}

export default Login;