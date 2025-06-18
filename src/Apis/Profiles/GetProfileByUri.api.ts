import { request } from '@/Apis/Request.api'

export const getProfileByUri = async ({
  uri,
  activeProfileId
}: {
  uri: string
  activeProfileId: string
}) => {
  try {
    const profilesRequest = await request.get(
      `/profiles/uri/${uri}?targetId=${activeProfileId}`
    )

    const { status, data } = profilesRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
