import { backApiInstance } from './http'

const http = backApiInstance()

export const getSearchGroupApi = async (query) => {
  const URL = `/api/groups/search?${query}`
  return (await http.get(URL)).data
}

export const getTagsApi = async () => {
  const URL = '/api/tags/popular'
  const response = await http.get(URL)
  return response.data
}
