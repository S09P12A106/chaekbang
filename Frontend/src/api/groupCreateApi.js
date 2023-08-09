import axios from 'axios'

async function postGroup(groupData, accessToken) {
  await axios.post(
    process.env.REACT_APP_APPLICATION_SERVER_URL + '/groups',
    groupData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  )
}

export default postGroup
