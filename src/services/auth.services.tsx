import { authKey } from "@/constant/authKey";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

import { jwtDecode } from "jwt-decode";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  //   console.log(authToken);
  if (authToken) {
    const decodedData: any = jwtDecode(authToken);
    console.log(decodedData);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
