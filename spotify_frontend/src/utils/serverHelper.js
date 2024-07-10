import { backendUrl } from "./config";
export const makeUnauthenticatedPOSTRequest = async(route, body) =>{
    const response = await fetch(backendUrl + route,{
        method: "POST",
        headers: {
            "Content-Type": "application/json", //sometimes needed
        },
        body: JSON.stringify(body), //makes the input to string
    });
    const formattedResponse=await response.json(); //formats it 
    return formattedResponse;
};
export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};
export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};