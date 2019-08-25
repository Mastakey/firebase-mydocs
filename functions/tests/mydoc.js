const axios = require('axios');

let login = async function(){
    try {
        let res = await axios.post('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/login', {
            "email":"user5@email.com",
            "password":"123456"
        });
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let createDoc = async function(token){
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    try {
        let res = await axios.post('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/mydoc', {
            "title": "mytitle",
            "content":"mycontent"
        },
        {headers: headers});
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let editDocUpdate = async function(token, docId){
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
    try {
        let res = await axios.put(`https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/mydoc/${docId}`, {
            "title": "content update",
            "content":"mycontent2",
            "contentUpdated": true
        },
        {headers: headers});
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let editDocNoUpdate = async function(token, docId){
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
    try {
        let res = await axios.put(`https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/mydoc/${docId}`, {
            "title": "no centent update",
            "content":"mycontent3",
            "contentUpdated": false
        },
        {headers: headers});
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let deleteData = async function(token, docId){
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
    try {
        let res = await axios.delete(`https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/mydoc/${docId}`, 
            { headers: headers });
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let viewDoc = async function(docId){
    try {
        let res = await axios.get(`https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/mydoc/${docId}`);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }    
}

let run = async function(){
    console.log("Login Run");
    let data = await login();
    console.log("Create Doc")
    let token = data.token;
    let doc = await createDoc(token);
    //await sleep(2000);
    console.log('View Doc');
    await viewDoc(doc.mdoc.docId);
    console.log("Edit Doc");
    await editDocUpdate(token, doc.mdoc.docId);
    //await editDocNoUpdate(token, doc.docId);
    console.log("View Doc");
    await viewDoc(doc.mdoc.docId);
    
    
    console.log("Delete Doc " + doc.mdoc.docId);
    await deleteData(token, doc.mdoc.docId);
}

let sleep = function(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

run();
