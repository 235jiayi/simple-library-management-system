<template>
  <div class="header">
    <audio controls="controls" ref="audio" hidden v-show="!showIcon">
      <source :src="music" type="audio/mpeg" />
    </audio>
    <div class="header__wrapper">
      <div class="header__middle">
        <div class="router" @click="router"></div>
      </div>
      <div class="header__right">
        <div class="header__right__item" @click="handleShowInfo">
          <svg
            viewBox="0 0 32 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_28_12044)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7ZM5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16ZM16 11C16.5523 11 17 11.4477 17 12V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V12C15 11.4477 15.4477 11 16 11ZM15 20C15 19.4477 15.4477 19 16 19H16.01C16.5623 19 17.01 19.4477 17.01 20C17.01 20.5523 16.5623 21 16.01 21H16C15.4477 21 15 20.5523 15 20Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_28_12044"
                x="-4"
                y="0"
                width="40"
                height="40"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_28_12044"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_28_12044"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div class="header__right__item" v-show="!showIcon" @click="musicStart">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.4332 8.09871C15.7797 8.26523 16 8.6156 16 9.00001V23C16 23.3844 15.7797 23.7348 15.4332 23.9013C15.0867 24.0678 14.6755 24.021 14.3753 23.7809L9.64922 20H6C5.44771 20 5 19.5523 5 19V13C5 12.4477 5.44771 12 6 12H9.64922L14.3753 8.21914C14.6755 7.979 15.0867 7.93219 15.4332 8.09871ZM14 11.0806L10.6247 13.7809C10.4474 13.9227 10.2271 14 10 14H7V18H10C10.2271 18 10.4474 18.0773 10.6247 18.2191L14 20.9194V11.0806ZM20.2929 12.2929C20.6834 11.9024 21.3166 11.9024 21.7071 12.2929L24 14.5858L26.2929 12.2929C26.6834 11.9024 27.3166 11.9024 27.7071 12.2929C28.0976 12.6834 28.0976 13.3166 27.7071 13.7071L25.4142 16L27.7071 18.2929C28.0976 18.6834 28.0976 19.3166 27.7071 19.7071C27.3166 20.0976 26.6834 20.0976 26.2929 19.7071L24 17.4142L21.7071 19.7071C21.3166 20.0976 20.6834 20.0976 20.2929 19.7071C19.9024 19.3166 19.9024 18.6834 20.2929 18.2929L22.5858 16L20.2929 13.7071C19.9024 13.3166 19.9024 12.6834 20.2929 12.2929Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="header__right__item" v-show="showIcon" @click="musicPause">
          <svg
            viewBox="-5 -8 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.363 0.292787C17.7536 -0.0976792 18.3867 -0.097583 18.7772 0.293C20.8394 2.3558 21.9979 5.15319 21.9979 8.07C21.9979 10.9868 20.8394 13.7842 18.7772 15.847C18.3867 16.2376 17.7536 16.2377 17.363 15.8472C16.9724 15.4567 16.9723 14.8236 17.3628 14.433C19.05 12.7452 19.9979 10.4565 19.9979 8.07C19.9979 5.68352 19.05 3.39475 17.3628 1.707C16.9723 1.31642 16.9724 0.683252 17.363 0.292787ZM10.4332 0.168698C10.7797 0.335218 11 0.685596 11 1.07V15.07C11 15.4544 10.7797 15.8048 10.4332 15.9713C10.0867 16.1378 9.67548 16.091 9.37531 15.8509L4.64922 12.07H1C0.447715 12.07 0 11.6223 0 11.07V5.07C0 4.51772 0.447715 4.07 1 4.07H4.64922L9.37531 0.289132C9.67548 0.0489966 10.0867 0.00217833 10.4332 0.168698ZM9 3.15062L5.62469 5.85087C5.44738 5.99272 5.22707 6.07 5 6.07H2V10.07H5C5.22707 10.07 5.44738 10.1473 5.62469 10.2891L9 12.9894V3.15062ZM13.833 3.82279C14.2236 3.43232 14.8567 3.43242 15.2472 3.823C16.372 4.94817 17.0039 6.47402 17.0039 8.065C17.0039 9.65598 16.372 11.1818 15.2472 12.307C14.8567 12.6976 14.2236 12.6977 13.833 12.3072C13.4424 11.9167 13.4423 11.2836 13.8328 10.893C14.5827 10.1429 15.0039 9.12566 15.0039 8.065C15.0039 7.00434 14.5827 5.98711 13.8328 5.237C13.4423 4.84642 13.4424 4.21325 13.833 3.82279Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="header__right__item">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 7C20.8954 7 20 7.89543 20 9C20 9.3473 20.0885 9.67393 20.2442 9.95855C20.2544 9.97399 20.2642 9.9898 20.2737 10.006C20.2831 10.022 20.2919 10.0382 20.3003 10.0546C20.6532 10.6222 21.2825 11 22 11C23.1046 11 24 10.1046 24 9C24 7.89543 23.1046 7 22 7ZM19.1581 11.8148C19.883 12.5467 20.8885 13 22 13C24.2091 13 26 11.2091 26 9C26 6.79086 24.2091 5 22 5C19.7909 5 18 6.79086 18 9C18 9.37702 18.0522 9.74185 18.1497 10.0877L12.8419 13.1852C12.117 12.4533 11.1115 12 10 12C7.79086 12 6 13.7909 6 16C6 18.2091 7.79086 20 10 20C11.1117 20 12.1174 19.5465 12.8423 18.8144L18.1509 21.9079C18.0526 22.255 18 22.6214 18 23C18 25.2091 19.7909 27 22 27C24.2091 27 26 25.2091 26 23C26 20.7909 24.2091 19 22 19C20.8902 19 19.886 19.452 19.1613 20.1819L13.8505 17.0871C13.9479 16.7415 14 16.3768 14 16C14 15.623 13.9478 15.2581 13.8503 14.9123L19.1581 11.8148ZM11.6997 14.9454C11.7081 14.9618 11.717 14.978 11.7263 14.994C11.7358 15.0102 11.7456 15.026 11.7558 15.0414C11.9115 15.3261 12 15.6527 12 16C12 16.3473 11.9115 16.6739 11.7558 16.9585C11.7455 16.9742 11.7355 16.9902 11.726 17.0065C11.7167 17.0224 11.708 17.0384 11.6997 17.0546C11.3468 17.6221 10.7175 18 10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C10.7175 14 11.3468 14.3778 11.6997 14.9454ZM20.2153 22.0964C20.24 22.064 20.2629 22.0296 20.284 21.9935C20.3042 21.9588 20.3221 21.9235 20.3377 21.8875C20.6966 21.3523 21.3072 21 22 21C23.1046 21 24 21.8954 24 23C24 24.1046 23.1046 25 22 25C20.8954 25 20 24.1046 20 23C20 22.6749 20.0776 22.3678 20.2153 22.0964Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="header__right__login" @click="showRight = !showRight">
          <div v-show="!login" @click="handleRouterLogin" class="user">
            未登录
          </div>
          <div v-show="login" class="user">{{ username }}</div>
          <div class="img-wrapper" @click="handleRouterLogin">
            <img :src="src" alt="" />
          </div>
        </div>
        <div class="header__open__right" v-show="showRight && login">
          <div class="header__open__right__items" @click.stop="logout">
            退出登录
          </div>
        </div>
      </div>
    </div>
    <div class="info" v-show="showInfo" @click="showInfoClick" ref="info">
      <div class="info__content" @click.stop>
        <div
          class="info__content__font"
          v-html="contentToShow"
          v-if="!addBook"
        ></div>
        <div class="info__content__addBook" v-else>
          <div class="info__content__addBook__head">请填写书籍信息</div>
          <div class="info__content__addBook__item">
            <div class="info__content__addBook__item__title">书籍名称</div>
            <el-input
              placeholder="请输入书籍名称"
              v-model="bookName"
              clearable
              class="info__content__addBook__item__input"
            >
            </el-input>
          </div>
          <div class="info__content__addBook__item">
            <div class="info__content__addBook__item__title">存储位置</div>
            <el-input
              placeholder="请输入书籍存储位置"
              v-model="bookPlace"
              clearable
              class="info__content__addBook__item__input"
            >
            </el-input>
          </div>
          <div class="info__content__addBook__item">
            <div class="info__content__addBook__item__title">书籍数量</div>
            <el-input
              placeholder="请输入书籍数量"
              v-model="bookCount"
              clearable
              class="info__content__addBook__item__input"
              type="number"
            >
            </el-input>
          </div>
          <div class="info__content__addBook__item">
            <div class="info__content__addBook__item__title">书籍作者</div>
            <el-input
              placeholder="请输入书作者"
              v-model="writer"
              clearable
              class="info__content__addBook__item__input"
              type="text"
            >
            </el-input>
          </div>
          <div class="info__content__addBook__item">
            <div class="info__content__addBook__item__title">出版社</div>
            <el-input
              placeholder="请输入出版社"
              v-model="publisher"
              clearable
              class="info__content__addBook__item__input"
              type="text"
            >
            </el-input>
          </div>
          <el-button
            class="info__content__addBook__item__btn"
            round
            @click="handleAddBook"
            >确认</el-button
          >
        </div>
      </div>
      <div class="info__close">点击空白处关闭</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "",
  props: ["content", "showContent", "role"],
  data() {
    return {
      showRight: false,
      showIcon: false,
      music: require("../assets/music.mp3"),
      src: require("../assets/default.png"),
      src1: require("../assets/default.png"),
      login: false,
      showInfo: false,
      username: "",
      addBook: false,
      bookName: "",
      bookPlace: "",
      bookCount: "",
      contentToShow: "",
      writer: "",
      publisher: "",
    };
  },
  mounted() {
    if (this.$store.state.login) {
      this.login = true;
      this.username = this.$store.state.user.username;
    }
    this.changeHead();
  },
  watch: {
    showContent() {
      this.showInfo = this.showContent;
      this.cover();
    },
    role() {
      this.changeHead();
    },
    content() {
      if (this.content.includes("addBook")) {
        this.addBook = true;
      }
      this.contentToShow = this.content;
    },
  },
  methods: {
    cover() {
      this.$nextTick(() => {
        let bottom = document.documentElement.scrollHeight;
        this.$refs.info.style.height = bottom + "px";
      });
    },
    handleShowInfo() {
      this.cover();
      this.showInfo = true;
    },
    changeHead() {
      if (this.$store.state.login) {
        this.login = true;
        this.username = this.$store.state.user.username;
        axios
          .get(
            `http://127.0.0.1:5000/getHead/${this.$store.state.user.username}`
          )
          .then((res) => {
            if (res.data.status !== 0) {
              this.src = res.data.message;
            }
          });
      } else {
        this.login = false;
        this.username = "";
        this.src = this.src1;
      }
    },
    logout() {
      this.$store.commit("Logout");
      this.$router.push("/login");
      this.changeHead();
    },
    router() {
      this.$router.push("/");
    },
    musicStart() {
      this.showIcon = !this.showIcon;
      this.$refs.audio.play();
    },
    musicPause() {
      this.showIcon = !this.showIcon;
      this.$refs.audio.pause();
    },
    handleRouterLogin() {
      this.$router.push("/login");
    },
    showInfoClick() {
      this.showInfo = false;
      this.addBook = false;
      this.$emit("showContentFalse");
    },
    handleAddBook() {
      axios
        .post("http://127.0.0.1:5000/addBook", {
          name: this.bookName,
          location: this.bookPlace,
          quantity: this.bookCount,
          writer: this.writer,
          publisher: this.publisher,
        })
        .then((res) => {
          this.bookName = "";
          this.bookPlace = "";
          this.bookCount = "";
          this.writer = "";
          this.publisher = "";
          this.contentToShow = res.data.message;
          this.addBook = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.user {
  height: 0.64rem;
  font-size: 0.16rem;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.64rem;
  text-shadow: 0px 0.04rem 0.04rem rgba(0, 0, 0, 0.25);
}
.info {
  z-index: 7;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  height: 7.2rem;
  width: 12.8rem;
  left: 0;
  right: 0;
  &__content {
    margin: 2rem 3.9rem 3rem 3.9rem;
    z-index: 8;
    position: relative;
    background: url("../assets/info-background.png");
    background-size: contain;
    width: 5rem;
    height: 3.7rem;
    padding: 0;
    display: grid;
    place-items: center;
    &__font {
      font-size: 0.14rem;
      position: relative;
      line-height: 0.2rem;
      white-space: pre-wrap;
    }
    &__addBook {
      display: flex;
      flex-direction: column;
      font-size: 0.14rem;
      position: relative;
      line-height: 0.2rem;
      height: 0.2rem;
      white-space: pre-wrap;
      position: relative;
      top: -0.6rem;
      &__head {
        position: absolute;
        top: -0.6rem;
        font-size: 0.3rem;
        left: 0.29rem;
      }
      &__item {
        display: flex;
        &__title {
          width: 0.6rem;
        }
        &__input {
          flex: 1;
          max-width: 2rem;
          position: relative;
          top: -0.03rem;
          left: 0.1rem;
          font-size: 0.14rem;
        }
        &__btn {
          top: 0.2rem;
          position: relative;
          width: 0.7rem;
          left: 0.9rem;
          background: rgb(184, 212, 206);
          border: transparent;
        }
      }
    }
  }
  &__close {
    font-weight: 400;
    color: #ffeaca;
    line-height: 0.28rem;
    font-size: 0.24rem;
    position: absolute;
    top: 4.46rem;
    left: 5.46rem;
    margin-top: 1.4rem;
    margin-left: 0.25rem;
  }
}
audio {
  position: absolute;
  z-index: 1;
}
.router {
  position: absolute;
  top: 0;
  left: 0.44rem;
  height: 0.64rem;
  width: 1.37rem;
}
.img-wrapper {
  margin-left: 0.09rem;
  margin-top: 0.12rem;
  width: 0.4rem;
  height: 0.4rem;
  border: 0.01rem solid #ae2020;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.header__wrapper {
  z-index: 2;
  display: flex;
  background-image: url(../assets/Header.png);
  background-size: cover;
  background-repeat: no-repeat;
  height: 0;
  width: 100%;
  padding-bottom: 5%;
  font-family: "Smiley_Sans";
}
.header__open {
  display: flex;
  flex-direction: column;
  &__middle {
    width: 0.88rem;
    position: absolute;
    top: 0;
    z-index: 10;
    &__items {
      line-height: 0.64rem;
      height: 0.64rem;
      font-size: 0.16rem;
      background: #f5ebe9;
      color: #c95945;
      z-index: 10;
      &:nth-of-type(1) {
        color: #953d2e;
      }
    }
  }
  &__right {
    position: absolute;
    top: 0.64rem;
    right: 0rem;
    width: 0.95rem;
    z-index: 10;
    &__items {
      text-align: center;
      line-height: 0.64rem;
      height: 0.64rem;
      font-size: 0.16rem;
      background: #f5ebe9;
      color: #c95945;
      z-index: 10;
    }
  }
}
.header__middle {
  margin-left: 3.23rem;
  height: 0.64rem;
  &__item {
    width: 0.88rem;
    text-align: center;
    margin-right: 0.24rem;
    float: left;
    color: #fff;
    font-size: 0.16rem;
    line-height: 0.64rem;
    height: 0.64rem;
  }
}
.header__right {
  position: absolute;
  right: 0.45rem;
  height: 0.64rem;
  line-height: 0.64rem;
  display: flex;
  width: 2.4rem;
  &__item {
    margin-right: 0.07rem;
    svg {
      font-size: 0.5rem;
      margin-bottom: 0.2rem;
      width: 0.36rem;
      height: 0.36rem;
    }
  }
  &__login {
    display: flex;
    position: absolute;
    right: 0;
    height: 0.6rem;
    font-size: 0.16rem;
    color: #fff;
    .svg {
      margin-top: 0.12rem;
      margin-left: 0.15rem;
    }
  }
}
</style>
