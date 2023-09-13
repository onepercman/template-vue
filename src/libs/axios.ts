import { API_URL } from "@/config/endpoints.config"
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {},
})

function onRequestFulfilled(config: InternalAxiosRequestConfig) {
  return config
}

function onResponseFulfilled(response: AxiosResponse) {
  response.statusText = ""
  response.data = response.data.data
  return Promise.resolve(response)
}

function onResponseRejected(error: AxiosError) {
  if (error.response?.data) {
    const data = error.response.data as any
    error.response.statusText = data["errorMsg"] || data["errorCode"]
    error.response.data = null
  } else {
    error.response!.statusText = "Connection lost"
  }
  return Promise.resolve(error.response)
}

api.interceptors.request.use(onRequestFulfilled)
api.interceptors.response.use(onResponseFulfilled, onResponseRejected)
