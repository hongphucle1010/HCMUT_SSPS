import { getStatusPath, logInPath, signUpPath } from "../../config/apiPath";
import { getToken } from "../../utils/authentication/authentication";
import { apiClient } from "..";
import { LogInResponse, SignUpResponse, StatusResponse } from "./types";

function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

export async function logInApi(username: string, password: string) {
  try {
    setAuthToken(getToken());
    const response = await apiClient.post<LogInResponse>(logInPath, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signUpApi(
  name: string,
  username: string,
  password: string
) {
  try {
    const response = await apiClient.post<SignUpResponse>(signUpPath, {
      name,
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getStatusApi() {
  try {
    setAuthToken(getToken());
    const response = await apiClient.get<StatusResponse>(getStatusPath);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
