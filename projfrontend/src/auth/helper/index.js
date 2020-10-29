import {API} from "../../backend"

export const signup = user => { //Method name in signup, and it takes user as a parameter. user will come from a json response.
    return fetch(`${API}/signup`, { //fetch takes 2 arguments: 1 is the URL and another are the carrying baggage while taking the request. Remeber we used to specify these in the postman.
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const signin = user => { //Method name in signup, and it takes user as a parameter. user will come from a json response.
    return fetch(`${API}/signin`, { //fetch takes 2 arguments: 1 is the URL and another are the carrying baggage while taking the request. Remeber we used to specify these in the postman.
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

//associated with signin for assigning tokens into the user browser
export const authenticate = (data, next) => {  //We set jwt i.e javascript web tokens from cookies, whenever the window is accessible to the user
    if(typeof window !== "undefined"){ //if we have access to the window, i.e. it is not undefined
        localStorage.setItem("jwt", JSON.stringify(data)) //localStorage meaning browser storage or cookies
        next();
    }
}

export const signout = next => { //next is the middleware. We have used a middleware, coz then we can specify a callback function right after this method is called. And there we can perform anything that we want
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next(); //can keep this next after the fetch()

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }
}

export const isAuthenticated = () => { // a simple boolean method
    if(typeof window == "undefined"){ //if we don't have access to the window then return false here itself
        return false;
    }

    //if we do have access then,
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt")) //Here we are getting that jwt token. We are going to later pass this value to frontend and again check if they are the same.
    }
    else{
        return false;
    }
}