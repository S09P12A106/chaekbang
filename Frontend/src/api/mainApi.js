import { backApiInstance } from './http'

const http = backApiInstance()

export const getPopularGroupsApi = async () => {
  const response = await http.get('/api/groups/popular')
  return response.data
}

export const getRecommendedTagAndGroupsApi = async () => {
  const response = await http.get('/api/groups/recommended')
  return response.data
}
