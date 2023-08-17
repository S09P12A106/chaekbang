import { rootApi } from '../../../api/rootApi'

const groupApiWithTag = rootApi.enhanceEndpoints({
  addTagTypes: ['Group', 'Users'],
})

const groupApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroup: builder.query({
      query: () => `group`,
      providesTags: (result, error, arg) => {
        if (error) {
          console.log(error)
        }
        return [{ type: 'Group', id: arg }]
      },
    }),
    getUsers: builder.query({
      query: () => `users`,
      providesTags: (result, error, arg) => {
        if (error) {
          console.log(error)
        }
        return [{ type: 'Users', id: arg }]
      },
    }),
  }),
  overrideExisting: false,
})

export { groupApi }
