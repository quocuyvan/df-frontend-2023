import axios from 'axios'
import { getSession } from './auth'

const fetcher = async <T>(url: string): Promise<T> => {
  const accessToken: string | null = getSession()

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const response = await axios.get(url, config)
  return response.data.data
}

export default fetcher
