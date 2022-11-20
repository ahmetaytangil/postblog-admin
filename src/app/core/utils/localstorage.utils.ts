import { LOCALSTORAGE } from "../constants/localstorage-paths.constants";
import { UserModel } from "../models/auth.model";

export const getUserLS = (): UserModel => {
  const user = localStorage.getItem(LOCALSTORAGE.user)
  return user ? JSON.parse(user) : ""
}

export const setUserLS = (data: UserModel) => {
  localStorage.setItem(LOCALSTORAGE.user, JSON.stringify(data))
}

export const getTokenLS = (): string => {
  const token = localStorage.getItem(LOCALSTORAGE.token)
  return token ? JSON.parse(token) : ""
}

export const setTokenLS = (token: string) => {
  localStorage.setItem(LOCALSTORAGE.token, JSON.stringify(token))
}
