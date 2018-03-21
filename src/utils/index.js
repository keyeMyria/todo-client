import axios from "axios";

const authHeader = "x-auth";
export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common[authHeader] = `${token}`;
  } else {
    delete axios.defaults.headers.common[authHeader];
  }
};
