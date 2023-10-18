import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'src/constant'

const setSession = (accessToken: string): void => {
  // Store the access token in a cookie or local storage
  // Here, we'll use local storage for demonstration purposes
  localStorage.setItem('accessToken', accessToken)
}

const getSession = (): string | null => {
  // Retrieve the access token from a cookie or local storage
  // Here, we'll use local storage for demonstration purposes
  return localStorage.getItem('accessToken')
}

const clearSession = (): void => {
  // Clear the access token from a cookie or local storage
  // Here, we'll use local storage for demonstration purposes
  localStorage.removeItem('accessToken')
}

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ data: { accessToken: string } }> =
      await axios.post(`${API_URL}/auth/login`, { email, password })

    const { accessToken } = response.data?.data || response.data

    setSession(accessToken)

    return true
  } catch (error) {
    alert(error?.message)
    return false
  }
}

const logout = (): void => {
  clearSession()
}

export { getSession, login, logout }
