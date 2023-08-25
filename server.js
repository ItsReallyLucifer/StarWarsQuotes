console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const { ReturnDocument } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://itsreallylucifer:6auFiz1MtvKScOl7@cluster0.bapirhi.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({extended: true}))
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                console.log(results)
            })
        res.sendFile(__dirname + '/index.html')
    })
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.log(error))
    })
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
  })
  .catch(error => console.error(error))





  
