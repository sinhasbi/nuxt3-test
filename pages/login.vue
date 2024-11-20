<template>
  <div class="login-page">
    <div class="login-block">
      <div class="login-content">
        <div class="logo">
          <img src="../assets/pc/gaia-logo-dark.png" alt="gaia-logo" />
        </div>
        <div class="account">
          <label for="account">
            <h4>帳號</h4>
            <input
              v-model="account"
              placeholder="請輸入您的帳號..."
              class="accountInput"
            />
          </label>
        </div>
        <div class="password">
          <label for="password">
            <h4>密碼</h4>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="請輸入您的密碼"
              class="passwordInput"
            />
          </label>
          <!-- <div class="showPassord" @click="togglePassword">
              <img
                :src="showPassword ? require('../assets/pc/eye-close.png') : ''"
                alt="Toggle Password Visibility"
              />
            </div>
          </div>-->
        </div>
        <div class="forgetPassword">
          <h4 class="forget">忘記密碼?</h4>
          <h4>
            還不是會員?
            <span class="register" @click="register">註冊</span>
          </h4>
        </div>
        <div class="login-button" @click="loginProcess">登入</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserAuth } from "@/composables/useUserAuth"
import { useUserProfile } from "@/composables/useUserProfile"

const router = useRouter()
const { doLogin } = useUserAuth()
const { getUserProfile } = useUserProfile()

const account = ref<string>("")
const password = ref<string>("")
const showPassword = ref<boolean>(false)

const register = () => {
  router.push("/register")
}

const loginProcess = async () => {
  if (!account.value || !password.value) {
    console.error("帳號和密碼不能為空")
    return
  }
  try {
    await doLogin({
      account: account.value,
      password: password.value
    })
  } catch (error) {
    console.log("登入失敗", error)
  }
}

onMounted(() => {
  getUserProfile()
})
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #270537 0%, #3f1454 100%);

  display: flex;
  justify-content: center;
  align-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/pc/loginPage-image.png");
    background-size: cover;
    background-position: center;
    z-index: 1;

    @media screen and (max-width: 768px) {
      background-image: url("../assets/mobile/loginPage-image.png");
    }
  }

  .login-block {
    z-index: 5;
    // width: 25%;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    @media screen and (max-width: 768px) {
      width: 90%;
    }
  }

  .login-content {
    margin-bottom: 64px;
    display: grid;
    gap: 32px;

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 16px;

      @media screen and (max-width: 768px) {
        padding: 8px 12px;
      }
    }

    //

    label {
      display: block;

      color: #ffffff;
      font-weight: 500;
      h4 {
        margin-bottom: 8px;
      }
      .accountInput,
      .passwordInput {
        display: block;
        width: 100%;
        padding: 10px 16px;
        border-radius: 19px;
        border: 1px solid #7f7f7f;
        transition: all 0.3s ease-in-out;
      }
      .accountInput:focus,
      .passwordInput:focus {
        outline: none;
        box-shadow: 0 0 0 3px #d478ff;
        background: #f4eaf9;
      }
      .accountInput::placeholder,
      .passwordInput::placeholder {
        font-weight: 500;
        font-size: 18px;
        color: #333333;

        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
      }
      .password {
        position: relative;

        .showPassord {
          position: absolute;
          z-index: 10;
          right: 16px;
          top: 14px;
          max-width: 28px;
          height: 28px;

          @media screen and (max-width: 768px) {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .forgetPassword {
      display: flex;
      justify-content: space-between;

      color: #ffffff;
      .register,
      .forget {
        cursor: pointer;
      }
    }
  }

  .login-button {
    font-weight: 500;
    width: 100%;
    height: 55px;
    border-radius: 30px;
    padding: 16px 32px;
    line-height: 23.17px;
    color: #ffffff;
    background-color: #c90008;
    text-align: center;
    border: none;
    cursor: pointer;
  }
}
</style>
