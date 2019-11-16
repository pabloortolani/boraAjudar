import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {auth} from './base';

import AdminCampanhas from './AdminCampanhas';

const AdminHome = props => {
    return <h2>Admin Home</h2>
}

class Admin extends Component{
    constructor(props){
        super(props);

        this.state = {
            checandoSeUserEstaLogado: true,
            isLoggedIn: false,
            user: null
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user=> {
            this.setState({
                checandoSeUserEstaLogado: false,
                isLoggedIn: !!user, /* "!!" retorna false se "user" for igual a null */
                user: user
            })
        })
    }
    render(){
        if(this.state.checandoSeUserEstaLogado){
            return <p>Aguarde...</p>
        }
        if(!this.state.isLoggedIn){
            return <Redirect to="/login" />
        }
        return(
            <div className="card">
                <h1>Painel Administrativo</h1>
                <Route path="/" component={AdminHome} />
                <Route path={`${this.props.match.url}/campanhas`} component={AdminCampanhas} />
            </div>
        )
    }
}

export default Admin;