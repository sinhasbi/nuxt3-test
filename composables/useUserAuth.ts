import { useRouter } from "nuxt/app"
import { useUserStore } from "@/store/user"
import { useCart } from "@/composables/useCart"
import useFetchApi from "@/composables/useFetchApi"

export function useUserAuth() {
  const router = useRouter()
  const { request } = useFetchApi()
  const { updateLoginStatus, setUserData } = useUserStore()
  const { fetchAndSetCartData } = useCart()

  interface UserAuth {
    account: string
    password: string
  }

  const login = async (loginData: UserAuth): Promise<any> => {
    const url = "/public/v1/users/login"
    console.log(loginData)
    const response = await request(url, {
      method: "POST",
      body: loginData,
      credentials: "include"
    })
    return response
  }

  const doLogin = async (loginData: UserAuth): Promise<any> => {
    try {
      const response = await login(loginData)
      if (response.code === 200) {
        const userData = response.data
        updateLoginStatus(true)
        setUserData(userData)

        await fetchAndSetCartData()

        console.log("登入成功", userData)
        router.push("/")
      }
    } catch (error) {
      console.log("登入失敗", error)
    }
  }

  return {
    doLogin
  }
}
