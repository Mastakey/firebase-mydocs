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

let run = async function(){
    console.log("Login Run");
    let data = await login();
    console.log("Create Doc")
    let token = data.token;
    await createDoc(token);
}

run();
