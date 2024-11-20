import useFetchApi from "@/composables/useFetchApi"

export function useUserProfile() {
  const { request } = useFetchApi()

  const registUserProfile = async (profileData: object) => {
    const url: string = "/api/v1/users"
    const response = await request(url, {
      method: "POST",
      credentials: "include",
      body: profileData
    })
    return response
  }

  // 獲取用戶資料
  const getUserProfile = async () => {
    const url: string = "/api/v1/user"
    const response = await request(url, {
      method: "GET",
      credentials: "include"
    })
    return response
  }

  // 更新用戶資料
  const updateUserProfile = async (profileData: object) => {
    const url: string = "/api/v1/users"
    const response = await request(url, {
      method: "PATCH",
      credentials: "include",
      body: profileData
    })
    return response
  }

  return {
    registUserProfile,
    getUserProfile,
    updateUserProfile
  }
}
