import { useUserStore } from "@/store/user"

export default function useFetchApi() {
  const userStore = useUserStore()
  const config = useRuntimeConfig()
  let isRefreshing = false
  const refreshSubscribers = []

  const subscribeTokenRefresh = cb => {
    refreshSubscribers.push(cb)
  }

  const onRefreshed = () => {
    refreshSubscribers.forEach(cb => cb())
    refreshSubscribers.length = 0
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(
        `${config.public.PUBLIC_API_URL}/public/v1/refresh/user`,
        {
          credentials: "include"
        }
      )
      if (!response.ok) throw new Error("Token refresh failed")
      return true
    } catch (error) {
      console.log("Token refresh failed:", error)
      userStore.clearLoginData()
      throw error
    }
  }

  const createFetchRequest = async (url, options) => {
    const defaultHeaders = {
      "Content-Type": "application/json"
    }
    return await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: "include"
    })
  }

  async function request(url, options = {}, retryCount = 0) {
    if (retryCount > 2) {
      throw new Error("Exceeded retry limit")
    }

    try {
      const response = await createFetchRequest(
        `${config.public.PUBLIC_API_URL}${url}`,
        options
      )

      if (response.status === 401 && !options._retry) {
        if (isRefreshing) {
          return new Promise(resolve => {
            subscribeTokenRefresh(() => {
              resolve(
                request(url, { ...options, _retry: true }, retryCount + 1)
              )
            })
          })
        }

        options._retry = true
        isRefreshing = true

        try {
          await refreshToken()
          isRefreshing = false
          onRefreshed()
          return request(url, options, retryCount + 1)
        } catch (refreshError) {
          isRefreshing = false
          return Promise.reject(refreshError)
        }
      }

      if (!response.ok) throw new Error("Network response was not ok")
      return await response.json()
    } catch (error) {
      console.error("API request error:", error)
      throw error
    }
  }

  return {
    request
  }
}
