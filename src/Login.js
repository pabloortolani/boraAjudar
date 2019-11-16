import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {auth} from './base';

class Login extends Component{
    constructor(props){
        super(props);

        this.email = null;
        this.passwd = null;

        this.state = {
            isLoggedIn: false,
            error: false,
            emProcessoDeLogin: false
        };

        //Permite o método "handlerLogin" usar o "this" dentro dele.
        this.handlerLogin = this.handlerLogin.bind(this);
    }

    handlerLogin(){
        this.setState({emProcessoDeLogin: true, error: false});

        auth
        .signInWithEmailAndPassword(this.email.value, this.passwd.value)
        .then((user)=>{
            this.setState({error: false, emProcessoDeLogin: false, isLoggedIn: true});
        })
        .catch(error => {
            this.setState({error: true, emProcessoDeLogin: false});
            console.log("Error: ", error);
        })
    }

    render(){
        if(this.state.isLoggedIn){
            return <Redirect to="/admin" />;
        }
        return(
            <div>
                <h1>Login</h1>
                <input type="email" ref={ref => this.email = ref} />
                <input type="password" ref={ref => this.passwd = ref} />
                <button disabled={this.state.emProcessoDeLogin} onClick={this.handlerLogin}>LOGIN</button>
                {this.state.error && 
                    <p>Usuário ou senha inválidos.</p>
                }
            </div>
        )
    }
}

export default Login;