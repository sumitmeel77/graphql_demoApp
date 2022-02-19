const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema')
const mongoose = require('mongoose')

const url = "mongodb+srv://username:gTh0VhSUzf7vnubo@cluster0.6bfdd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// connecting with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connection successfull") }).catch((err) => console.log(err))


const app = express();

//This route will be used as an endpoint to interact with Graphql, 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema 
    schema,
    graphiql: true
}));

// listening on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 