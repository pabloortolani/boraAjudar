//Necessário instalar a dependencia "yarn add re-base"
import Rebase from 're-base';
//Necessário instalar a dependencia "yarn add firebase"
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC9pdATmJWwpnahPB0oMCh4t22EIXpm68U",
    authDomain: "bora-ajudar-pablo.firebaseapp.com",
    databaseURL: "https://bora-ajudar-pablo.firebaseio.com",
    projectId: "bora-ajudar-pablo",
    storageBucket: "bora-ajudar-pablo.appspot.com",
    messagingSenderId: "19724210712",
    appId: "1:19724210712:web:9a6682c7fe7d138abd696d"
};

// Initialize Firebase
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

//Para verificar se o usuário está logado.
export const auth = firebase.auth();

export default base;