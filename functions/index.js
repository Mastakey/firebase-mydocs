const functions = require('firebase-functions');
const cors = require('cors');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllDocs, viewDoc, createDoc, editDoc, deleteDoc, viewDocHistory } = require('./handlers/mydoc');
const { signUp, login, getAuthenticatedUser, getUserDetails } = require('./handlers/users');


app.use(cors());


//Doc routes
app.get('/mydoc', getAllDocs);
app.get('/mydoc/:docId', viewDoc);
app.get("/mydoc/history/:docId", viewDocHistory);
app.post('/mydoc', FBAuth, createDoc);
app.put('/mydoc/:docId', FBAuth, editDoc);
app.delete("/mydoc/:docId", FBAuth, deleteDoc);
//TODO
//add like
//remove like
//add comment
//edit comment
//remove comment

//Tag routes
//add tag to doc
//remove tag from doc
//search docs by tag
//get all tags

//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:username', getUserDetails);

exports.api = functions.https.onRequest(app);