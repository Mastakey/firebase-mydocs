const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllDocs, createDoc, editDoc, deleteDoc } = require('./handlers/mydoc');
const { signUp, login } = require('./handlers/users');


//Doc routes
app.get('/mydoc', getAllDocs);
app.post('/mydoc', FBAuth, createDoc);
app.put('/mydoc/:docId', FBAuth, editDoc);
app.delete("/mydoc/:docId", FBAuth, deleteDoc);
//TODO
//remove like
//add comment
//edit comment
//remove comment

//Tag routes
//add tag
//add tag to doc
//remove tag
//search tag
//get all tags
//add like

//User routes
app.post("/signup", signUp);
app.post("/login", login);

exports.api = functions.https.onRequest(app);