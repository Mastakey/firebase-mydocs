const axios = require('axios');

let signUp = async function(){
    try {
        let res = await axios.post('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/signup', {
            "email":"user5@email.com",
            "password":"123456",
            "confirmPassword":"123456",
            "username":"user5"
        });
        //console.log(res);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
    }
    catch (err){
        //console.error(err);
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let login = async function(){
    try {
        let res = await axios.post('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/login', {
            "email":"user5@email.com",
            "password":"123456"
        });
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let run = async function(){
    console.log("Sign Up Run");
    await signUp();
    console.log("Login Run");
    await login();
}

run();
