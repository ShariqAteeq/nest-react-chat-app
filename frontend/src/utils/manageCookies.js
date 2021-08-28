import cookie from "cookie";
import JSCookie from "js-cookie";
import jwt_decode from "jwt-decode";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

function setCookies(access_token, refresh_token) {
  JSCookie.set("access_token", access_token);
  if (refresh_token) {
    JSCookie.set("refresh_token", refresh_token);
  }
}

function getCookie(key) {
  return JSCookie.get(key);
}

function clearCookies(setUser) {
  JSCookie.remove("access_token");
  JSCookie.remove("refresh_token");
  setUser(null);
}

function getJwtDecoded(token) {
  return jwt_decode(token);
}

function checkTokenExpiration(expiration) {
  return Date.now() >= expiration * 1000;
}

export {
  parseCookies,
  setCookies,
  getCookie,
  clearCookies,
  getJwtDecoded,
  checkTokenExpiration,
};
