// @ts-nocheck
import axios from "axios";
import { BASE_URL } from "./URL";
export const PostAPI = async (url, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  }; 
  try {
    let response = await axios.post(`${BASE_URL}${url}`, postData, config);
    return response;
  } catch (error) {}
};

export const loginAPI = async (url, postData) => {
  try {
    const res = await axios.post(BASE_URL + url, postData);
    return res;
  } catch (err) {}
};
