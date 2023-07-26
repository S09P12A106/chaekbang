import { apiInstance, backApiInstance } from './http'
import axios from 'axios'
const JSON_SERBER = 'http://localhost:4000'

const getSearchGroupApi = async () => {}

const getTagsApi = async () => {
  //   const URL = '/api/tags/popular'
  const URL = '/tags'
  const response = await axios.get(JSON_SERBER + URL)
  return response.data
}

export { getTagsApi }
