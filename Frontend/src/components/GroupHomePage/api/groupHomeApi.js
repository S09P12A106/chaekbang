import { rootApi } from '../../../api/rootApi'

const groupHomeWithTag = rootApi.enhanceEndpoints({
  addTagTypes: ['Meetings'],
})

const groupHomeApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query({
      query: () => `meetings`,
      providesTags: (result, error, arg) => {
        if (error) {
          console.log(error)
        }
        return [{ type: 'Meetings', id: arg }]
      },
    }),
    getAdd: builder.query({
      query: () => `addmeetings`,
      providesTags: (result, error, arg) => {
        if (error) {
          console.log(error)
        }
        return [{ type: 'Meetings', id: arg }]
      },
    }),
  }),
  overrideExisting: false,
})

export { groupHomeApi }
