import cookie from "cookie_js";

export function getToken() {
  return cookie.get("token");
}

export function getuserLoc() {
  return cookie.get("userLoc");
}

export function getuserName() {
  return cookie.get("userName");
}

export function setToken(token) {
  // console.log('token注入');
  return cookie.set("token", token, { expires: 7 });
}

export function setuserName(value) {
  return cookie.set("userName", value);
}

export function setuserLoc(value) {
  return cookie.set("userLoc", value);
}

export function getCollapse() {
  let Collapse = cookie.get("Collapse");
  if (Collapse) {
    return Collapse;
  } else {
    return "false";
  }
}

export function setCollapse(value) {
  return cookie.set("Collapse", value);
}

export function removeToken() {
  cookie.remove("userName");
  cookie.remove("userLoc");
  return cookie.remove("token");
}
