import { jwtDecode } from "jwt-decode";

function decode(jwt) {
    const decode = jwtDecode(jwt);
    console.log(decode);
    return decode;
}

export function isVariable(jwt) {
    const currentTime = Date.now() / 1000;
    return decode(jwt).exp >= currentTime;
}