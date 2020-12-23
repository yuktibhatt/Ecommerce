import {API} from "../../backend"
import {cartEmpty} from "../../core/helper/cartHelper"

export const signup = (user) => {
    return fetch(`${API}user/`, {
        method : "POST",
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user),
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};



export const signin = (user) => {
    const formData = new FormData();
    
    for(const name in user){
        formData.append(name, user[name]);
    }
    
    for(var key of formData.keys()){
        console.log("MyKey: ",key);
    }

    return fetch(`${API}user/login/`,{
        method: "POST",
        body: formData,
    })
    .then((response) => {
        console.log("Success: ",response);
        return response.json(); 
    })
    .catch((err) => console.log(err));
};



export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};


export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.userId

    if(typeof window !== undefined) {
        localStorage.removeItem("jwt")
        cartEmpty(() => {});

        return fetch(`${API}USER/LOGOUT/${userId}`, {
            method: "GET"

        })
        .then((response) => {
            console.log("signout success")
            next();

        })
        .catch((err) => console.log(err));

    }
};



