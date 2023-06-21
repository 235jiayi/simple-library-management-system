<template>
  <div class="home">
    <div class="connect">联系我们：wangjiayi@gmail.com</div>
    <Header
      :content="content"
      :showContent="showContent"
      @showContentFalse="showContentFalse"
      :role="role"
    />
    <Content
      :showTable="showTable"
      :showType="showType"
      @showTableFalse="showTableFalse"
      @showContentTrue="showContentTrue"
    />
    <div class="home__content">
      <div class="slide-banner">
        <div class="banner-wrapper">
          <div class="slide-banner-wrapper" ref="slide">
            <div class="slide-banner-content" v-if="is_administrator">
              <div class="slide-page">
                <h1 class="slide-header">管理用户</h1>
                <button class="ensure btn-administrator" @click="checkAllUser">
                  查看
                </button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header">管理图书</h1>
                <button
                  class="ensure btn-administrator"
                  @click="checkAdministratorBook"
                >
                  查看
                </button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header">管理借阅表</h1>
                <button
                  class="ensure btn-administrator"
                  @click="checkBorrowingForm"
                >
                  查看
                </button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header">处理用户申请</h1>
                <button class="ensure btn-administrator" @click="handleApply">
                  查看
                </button>
              </div>
            </div>
            <div class="slide-banner-content" v-else>
              <div class="slide-page">
                <h1 class="slide-header checkReminder">显示我的信息</h1>
                <button class="ensure" @click="checkMyInfo">查看</button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header checkReminder">查看图书信息</h1>
                <button class="ensure" @click="checkUserBook">查看</button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header">还书</h1>
                <span class="slide-clue">请输入书籍编号:</span><br />
                <input
                  type="text"
                  placeholder="请填写书籍编号"
                  class="slide-num"
                  ref="returnBook"
                />
                <button class="ensure" @click="returnBook">确认</button>
              </div>
              <div class="slide-page">
                <h1 class="slide-header">修改密码</h1>
                <span class="slide-clue">请输入新密码:</span><br />
                <input
                  type="password"
                  placeholder="请填写新密码"
                  class="slide-num"
                  ref="changePassword"
                />
                <button class="ensure" @click="changePassword">确认</button>
              </div>
            </div>
          </div>
          <div class="dots-wrapper">
            <span
              class="dot"
              v-for="num in nums"
              :key="num"
              :class="{ active: currentPageIndex === num - 1 }"
            ></span>
          </div>
        </div>
        <div class="btn-wrap">
          <button class="prev" @click="nextPage">下一项服务</button>
          <button class="next" @click="prePage">上一项服务</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/Header.vue";
import Content from "../../components/Content.vue";
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import axios from "axios";
BScroll.use(Slide);
export default {
  data() {
    return {
      role: "",
      content: `用户操作界面`,
      showContent: false,
      nums: 4,
      currentPageIndex: 0,
      is_administrator: false,
      showTable: false,
      showType: "",
    };
  },
  beforeMount() {
    this.title = require("../../assets/title/title1.png");
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
    if (!(localStorage.getItem("login") == "true")) {
      this.$router.push("/login");
    } else {
      this.overdue();
    }
    if (
      this.$store.state.user?.is_administrator ||
      (this.$store.state.user.is_administrator == undefined &&
        JSON.parse(localStorage.getItem("user"))["is_administrator"])
    ) {
      this.is_administrator = true;
    }
  },
  beforeDestroy() {
    this.slide.destroy();
  },
  watch: {},
  methods: {
    overdue() {
      const time = new Date();
      const year = time.getFullYear();
      const month =
        time.getMonth() + 1 >= 10
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1);
      const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
      const timeString = `${year}-${month}-${day}`;
      axios
        .get(
          `http://127.0.0.1:5000/overdue/${
            JSON.parse(localStorage.getItem("user"))?.userID
          }/${timeString}`
        )
        .then((res) => {
          const msg = res.data.message;
          if (res.data.status == 1) {
            this.content = msg;
            this.showContent = true;
          }
        });
    },
    init() {
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100,
          loop: true,
          autoplay: false,
        },
        useTransition: false,
        momentum: false,
        bounce: false,
        stopPropagation: true,
      });
      this.slide.on("scrollEnd", this._onScrollEnd);
      this.slide.on("slideWillChange", (page) => {
        this.currentPageIndex = page.pageX;
      });
      this.slide.on("slideWillChange", (page) => {});
      this.slide.on("slidePageChanged", (page) => {});
    },
    _onScrollEnd() {},
    nextPage() {
      this.slide.next();
    },
    prePage() {
      this.slide.prev();
    },
    checkMyInfo() {
      axios
        .get(
          `http://127.0.0.1:5000/checkMyInfo/${this.$store.state.user.userID}`
        )
        .then((res) => {
          const data = res.data;
          const {
            username,
            currentRent,
            userID,
            accountState,
            email,
            telephone,
            bookdata,
            password,
          } = data.message;
          this.content = `姓名：${username}\n读者编号：${userID}\n邮箱：${email}\n电话：${telephone}\n家庭住址：${bookdata}\n密码：${password}\n目前借阅书籍：${
            currentRent == "" ? "无" : `\n${currentRent}`
          }\n账号状态：${accountState}`;
          this.showContent = true;
        });
    },
    returnBook() {
      axios
        .post("http://127.0.0.1:5000/returnBook", {
          userID: this.$store.state.user.userID,
          bookID: this.$refs.returnBook.value,
        })
        .then((res) => {
          const data = res.data;
          this.content = data.message;
          this.showContent = true;
        });
    },
    changePassword() {
      axios
        .post("http://127.0.0.1:5000/changePassword", {
          userID: this.$store.state.user.userID,
          newPassword: this.$refs.changePassword.value,
        })
        .then((res) => {
          const data = res.data;
          this.content = data.message;
          this.showContent = true;
        });
    },
    checkUserBook() {
      this.showType = "checkUserBook";
      this.showTable = true;
    },
    checkAllUser() {
      this.showType = "checkAllUser";
      this.showTable = true;
    },
    checkBorrowingForm() {
      this.showType = "checkBorrowingForm";
      this.showTable = true;
    },
    handleApply() {
      this.showType = "handleApply";
      this.showTable = true;
    },
    checkAdministratorBook() {
      this.showType = "checkAdministratorBook";
      this.showTable = true;
    },
    freezeUser() {
      axios
        .post("http://127.0.0.1:5000/freezeUser", {
          username: this.$refs.userToFreeze.value,
        })
        .then((res) => {
          const data = res.data;
          this.content = data.message;
          this.showContent = true;
          setTimeout(() => {
            this.showContent = false;
          }, 1500);
          this.$refs.userToFreeze.value = "";
        });
    },
    openUser() {
      axios
        .post("http://127.0.0.1:5000/openUser", {
          username: this.$refs.userToOpen.value,
        })
        .then((res) => {
          const data = res.data;
          this.content = data.message;
          this.showContent = true;
          setTimeout(() => {
            this.showContent = false;
          }, 1500);
          this.$refs.userToFreeze.value = "";
        });
    },
    showContentFalse() {
      this.showContent = false;
    },
    showTableFalse() {
      this.showTable = false;
    },
    showContentTrue(content) {
      this.showContent = true;
      this.content = content;
    },
  },
  components: {
    Header,
    Content,
  },
};
</script>
<style lang="less" scoped>
.connect {
  position: absolute;
  right: 0.45rem;
  bottom: 0.39rem;
  height: 0.14rem;
  font-style: "Smiley_Sans";
  font-weight: 400;
  font-size: 0.1rem;
  line-height: 0.14rem;
  color: #999999;
}

.home {
  position: relative;
  height: 8.7rem;
  width: 12.8rem;
  background: url("../../assets/background.png");
  background-size: 100% 3.8rem;
  background-repeat: no-repeat;
  background-position-y: 2.47rem;
}
.home__content {
  background-image: url("../../assets/login-background.png");
  background-repeat: no-repeat;
  background-size: 4.8rem 4.36rem;
  font-size: 0.14rem;
  font-weight: 400;
  color: #d1a481;
  position: absolute;
  left: 4rem;
  top: 1.67rem;
  width: 4.8rem;
  height: 4.36rem;
}
.prev,
.next {
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.08rem 0 0.08rem !important;
}

.slide-banner {
  .banner-wrapper {
    position: relative;
  }
  .slide-banner-wrapper {
    min-height: 0.01rem;
    overflow: hidden;
  }

  .slide-banner-content {
    padding-top: 0.9rem;
    height: 3rem;
    white-space: nowrap;
    .slide-header {
      position: relative;
      font-size: 0.4rem;
      height: 0.26rem;
      line-height: 0.26rem;
    }
    .slide-clue {
      top: -0.3rem;
      position: relative;
      font-size: 0.2rem;
      height: 0.26rem;
      line-height: 0.26rem;
      margin-top: 0.3rem;
    }
    .slide-num {
      position: relative;
      top: -1.1rem;
      color: #000;
      text-decoration: none;
      outline: none;
      border: none;
      height: 0.4rem;
      background: #faf9f9;
      width: 2.3rem;
      border-radius: 0.08rem;
      text-indent: 0.2rem;
      font-size: 0.16rem;
      line-height: 0.4rem;
      margin-left: 0.24rem;
      &::placeholder {
        font-size: 0.16rem;
        line-height: 0.56rem;
        color: #c7b9b6;
        text-indent: 0.2rem;
      }
    }
    .ensure {
      position: relative;
      padding: 0 0.1rem 0 0.1rem;
      top: -1.1rem;
      background: #953d2e;
      color: #fff;
      font-size: 0.16rem;
      line-height: 0.4rem;
      height: 0.4rem;
      margin-left: 0.2rem;
      border-radius: 0.05rem;
      outline: none;
      border: 0rem;
    }
    .btn-administrator {
      top: 0.9rem;
    }
    .slide-page {
      height: 3.6rem;
      display: inline-block;
      width: 100%;
      line-height: 2rem;
      text-align: center;
      font-size: 0.26rem;
      margin-top: 0;
      position: relative;
      top: -0.25rem;
    }
  }
}

.dots-wrapper {
  top: 3.3rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .dot {
    display: inline-block;
    margin: 0 0.04rem;
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 50%;
    background: #eee;
    &.active {
      width: 0.2rem;
      border-radius: 0.05rem;
    }
  }
}
.btn-wrap {
  margin-top: -0.2rem;
  display: flex;
  justify-content: center;
  button {
    margin: 0 0.1rem;
    padding: 0.1rem;
    color: #fff;
    border-radius: 0.04rem;
    background-color: #666;
  }
}
.checkReminder,
.checkAllUser {
  top: -2rem;
}
.changePassword {
  display: flex;
  flex-direction: column;
  padding-left: 1.05rem;
  margin-top: -0.1rem;
  margin-bottom: -0.7rem;
  .userToChange {
    margin-bottom: 0.2rem;
    margin-top: 1.8rem;
  }
}
</style>
