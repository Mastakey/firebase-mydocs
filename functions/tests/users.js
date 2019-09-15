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

let getAuthUser = async function(){
    try {
        let res = await axios.post('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/login', {
            "email":"user1@email.com",
            "password":"123456"
        });
        const token = res.data.token;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        let user = await axios.get('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/user', {headers: headers});
        console.log(user.status);
        console.log(user.statusText);
        console.log(user.data);

    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let getUser = async function(username){
    try {
        let user = await axios.get('https://us-central1-mydocs-3a1ce.cloudfunctions.net/api/user/user1');
        console.log(user.status);
        console.log(user.statusText);
        console.log(user.data);

    } catch (err) {
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
    console.log("Get Auth User Run");
    await getAuthUser();
    console.log("Get User Run");
    await getUser('user1');
}

run();
