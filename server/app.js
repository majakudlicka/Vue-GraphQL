const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cors requests
app.use(cors());

mongoose.connect('mongodb+srv://shaun:123@cluster0-jc8ym.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', ()=> {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
