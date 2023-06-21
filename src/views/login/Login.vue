<template>
  <div class="login">
    <div class="connect">联系我们：wangjiayiv5@gmail.com</div>
    <Header :content="content" :showContent="showContent" :role="role" />
    <div class="login__title">
      <img :src="src0" alt="" />
    </div>
    <div class="login__content">
      <input
        type="text"
        class="login__name"
        placeholder="输入id"
        ref="userID"
      />
      <input
        class="login__password"
        type="password"
        placeholder="*****"
        ref="password"
      />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-show="checked"
      >
        <rect width="20" height="20" fill="#D1A481" />
        <path
          d="M5.20711 10.2929C4.81658 9.90237 4.18342 9.90237 3.79289 10.2929C3.40237 10.6834 3.40237 11.3166 3.79289 11.7071L5.20711 10.2929ZM8 14.5L7.29289 15.2071C7.68342 15.5976 8.31658 15.5976 8.70711 15.2071L8 14.5ZM16.2071 7.70711C16.5976 7.31658 16.5976 6.68342 16.2071 6.29289C15.8166 5.90237 15.1834 5.90237 14.7929 6.29289L16.2071 7.70711ZM3.79289 11.7071L7.29289 15.2071L8.70711 13.7929L5.20711 10.2929L3.79289 11.7071ZM8.70711 15.2071L16.2071 7.70711L14.7929 6.29289L7.29289 13.7929L8.70711 15.2071Z"
          fill="white"
        />
      </svg>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        v-show="!checked"
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="18"
          fill="white"
          stroke="#D1A481"
          stroke-width="2"
        />
      </svg>
      <div @click="handleClick" class="login__content__rember">记住密码</div>
      <div class="login__register" @click="register">注册</div>
      <div class="login__login" @click="handleLogin">登 陆</div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Header.vue";
import axios from "axios";

export default {
  data() {
    return {
      userID: "",
      checked: false,
      src0: require("../../assets/title/title3.png"),
      password: "",
      showContent: false,
      content: "登录",
      role: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    if (localStorage.getItem("remember") == "true") {
      this.$refs.userID.value = JSON.parse(localStorage.getItem("user")).userID;
      this.$refs.password.value = JSON.parse(
        localStorage.getItem("user")
      ).password;
      this.handleClick();
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    handleLogin() {
      if (this.$refs.userID.value != "" && this.$refs.password.value != "") {
        axios
          .post("http://127.0.0.1:5000/login", {
            userID: this.$refs.userID.value,
            password: this.$refs.password.value,
          })
          .then((res) => {
            const data = res.data;
            switch (data.status) {
              case 0:
                this.content = data.message;
                this.showContent = true;
                this.$refs.userID.value = "";
                this.$refs.password.value = "";
                setTimeout(() => {
                  this.showContent = false;
                }, 1000);
                break;
              default:
                this.$store.commit("Login", {
                  userID: this.$refs.userID.value,
                  username: data.username,
                  password: this.$refs.password.value,
                  is_administrator: data.is_administrator,
                  is_freeze: data.is_freeze,
                });
                if (this.checked) {
                  this.$store.commit("Remember");
                }
                this.showContent = true;
                this.content = data.message;
                this.role = Math.random() * 10;
                setTimeout(async () => {
                  this.$router.push("/");
                  this.$router.go(0);
                }, 1500);
                break;
            }
          });
      }
    },
    handleClick() {
      this.checked = !this.checked;
    },
  },
};
</script>
<style lang="less" scoped>
.connect {
  position: absolute;
  right: 0.45rem;
  bottom: 0.39rem;
  height: 0.14rem;
  font-style: normal;
  font-weight: 400;
  font-size: 0.1rem;
  line-height: 0.14rem;
  color: #999999;
}

.login {
  background-image: url("../../assets/background.png");
  background-size: 12.8rem 3.8rem;
  background-repeat: no-repeat;
  background-position-y: 2.47rem;
  height: 7.2rem;
  width: 12.8rem;
  position: relative;
  &__title {
    position: absolute;
    width: 0.64rem;
    height: 1.95rem;
    top: 1.77rem;
    left: 2.79rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &__content {
    background-image: url("../../assets/login-background.png");
    padding-top: 1rem;
    background-repeat: no-repeat;
    background-size: 5.17rem 4.7rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: #d1a481;
    position: absolute;
    left: 3.81rem;
    top: 1.77rem;
    width: 5.17rem;
    height: 4.7rem;
    svg {
      position: absolute;
      height: 0.13rem;
      width: 0.13rem;
      left: 1.12rem;
      top: 3.15rem;
      font-size: 0.18rem;
      color: #fff;
    }
    &__rember {
      line-height: 0.16rem;
      position: absolute;
      top: 3.14rem;
      left: 1.33rem;
    }
  }
  &__img {
    margin: 0.4rem auto 0.36rem auto;
    border-radius: 50%;
    width: 0.9rem;
    height: 0.9rem;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  &__name,
  &__password {
    display: block;
    width: 3.01rem;
    height: 0.54rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.6);
    font-size: 20px;
    font-weight: 400;
    line-height: 0.54rem;
    text-align: center;
    text-decoration: none;
    outline: none;
    border: none;
    color: #000;
    &::placeholder {
      color: #d1a481;
    }
  }
  &__password {
    margin-top: 0.29rem;
    margin-bottom: 0.05rem;
  }
  &__check {
    margin-top: -0.01rem;
    margin-left: 1.07rem;
    width: 0.2rem;
    height: 0.2rem;
    -webkit-appearance: none;
    text-decoration: none;
    border: 0.01rem solid #d1a481;
    &:checked {
      background: #d1a481;
      background-repeat: no-repeat;
      content: "\2714"; /*这是html特殊字符的css编码*/
      color: #fff;
    }
  }
  &__register {
    position: absolute;
    top: 3.14rem;
    left: 3.76rem;
  }
  &__login {
    margin: 1.05rem auto 0 auto;
    width: 1.95rem;
    height: 0.64rem;
    background: #953d2e;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
    line-height: 0.64rem;
    font-family: "Smiley Sans";
  }
}
</style>
