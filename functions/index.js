const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllDocs, createDoc, editDoc } = require('./handlers/mydoc');
const { signUp, login } = require('./handlers/users');


//Doc routes
app.get('/mydoc', getAllDocs);
app.post('/mydoc', FBAuth, createDoc);
app.put('/mydoc/:docId', FBAuth, editDoc);

//User routes
app.post("/signup", signUp);
app.post("/login", login);

exports.api = functions.https.onRequest(app);