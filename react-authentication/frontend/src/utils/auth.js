import { redirect } from "react-router-dom";

export function checkTokenExpiration() {
  const expireTime = localStorage.getItem("tokenExpires");
  const tokenExpiresTime = new Date(expireTime);
  const now = new Date();
  const duration = tokenExpiresTime.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  const duration = checkTokenExpiration();

  if (!token) {
    return null;
  }

  if (duration < 0) {
    return "EXPIRES";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthToken() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
