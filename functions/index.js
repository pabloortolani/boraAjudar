const functions = require('firebase-functions')
const admin = require('firebase-admin')


const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//admin.initializeApp(functions.config().firebase)
admin.initializeApp()

/*
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://bora-ajudar-pablo.firebaseio.com'
});
*/


const request = require('request-promise')
const parse = require('xml2js').parseString

const email = "EMAIL"
const token = "TOKEN_PAGSEGURO"
const checkouUrl = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code="+token

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    admin.database()
    .ref('transactions/111')
    .set({
        test: 1
    })
    .then(() => {
        res.send('BoraAjudar Server')
    })
})

app.post('/donate', (req, res) => {

    request({
        uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
        method: 'POST',
        form: {
            token: token,
            email: email,
            currency: 'BRL',
            itemId1: 'idCampanha',
            itemDescription1: 'Doação',
            itemQuantity1: '1',
            itemAmount1: '15.00'
        },
        headers:{
            'Content-Type': 'application/x-www-urlencoded; charset=UTF-8'
        }
    }).then(data => {
        parse(data, (err, json) => {
            res.send({
                url: checkouUrl+json.checkout.code[0]
            })
        })
    })

})

/*
app.post('/webhook', (req, res) => {
    const notificationCode = req.body.notificationCode;
    const consultaNotificacao = "https://ws.pagseguro.uol.com.br/v2/transactions/notifications/"+notificationCode;

    request(consultaNotificacao+notificationCode+'?email='+email+'&token='+token)
    .then(notificationXML => {
        parse(notificationXML, (err, transactionJson) => {
            const transaction = transactionJson.transaction
            const status = transaction.status[0]
            const amount = transaction.grossAmount[0]
            const campanha = transaction.items[0].item[0].id[0]
            res.send('ok')
        })
    })

})
*/

exports.api = functions.https.onRequest(app)
