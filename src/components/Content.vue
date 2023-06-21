<template>
  <div class="info" v-show="showMsg" @click="showMsgClick" ref="info">
    <div class="info__content">
      <!-- 普通用户查看书籍 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="4.8rem"
        stripe
        border
        v-show="type == 'checkUserBook'"
      >
        <el-table-column type="expand">
          <template slot-scope="props" class="demo-temp">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="图书编号">
                <span>{{ props.row.bookID }}</span>
              </el-form-item>
              <el-form-item label="出版社">
                <span>{{ props.row.publisher }}</span>
              </el-form-item>
              <el-form-item label="书籍作者">
                <span>{{ props.row.writer }}</span>
              </el-form-item>
              <el-form-item label="存储位置">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="剩余数量">
                <span>{{ props.row.quantity }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书编号" prop="bookID"> </el-table-column>
        <el-table-column label="图书名称" prop="name"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleRent(scope.$index)"
              >借阅</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看用户 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="4.4rem"
        border
        lazy
        v-show="type == 'checkAllUser'"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="expand">
          <template slot-scope="props" class="demo-temp">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="用户编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="用户电话">
                <span>{{ props.row.telephone }}</span>
              </el-form-item>
              <el-form-item label="用户邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{ props.row.bookdata }}</span>
              </el-form-item>
              <el-form-item label="用户状态">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="用户密码">
                <span>{{ props.row.password }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户编号" prop="id"> </el-table-column>
        <el-table-column label="用户名称" prop="name"> </el-table-column>
        <el-table-column label="用户操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent.stop="
                handleDeleteUser(scope.$index, tableData)
              "
              size="mini"
              type="danger"
              >删除用户
            </el-button>
            <el-button
              size="mini"
              type="warning"
              @click.stop="handleFreezeUser(scope.$index)"
              v-if="!tableData[scope.$index].is_freeze"
              >封禁用户
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click.stop="handleOpenUser(scope.$index)"
              v-if="tableData[scope.$index].is_freeze"
              >启动用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 管理员查看图书 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="4.3rem"
        stripe
        border
        v-show="type == 'checkAdministratorBook'"
      >
        <el-table-column type="expand">
          <template slot-scope="props" class="demo-temp">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="图书编号">
                <span>{{ props.row.bookID }}</span>
              </el-form-item>
              <el-form-item label="出版社">
                <span>{{ props.row.publisher }}</span>
              </el-form-item>
              <el-form-item label="书籍作者">
                <span>{{ props.row.writer }}</span>
              </el-form-item>
              <el-form-item label="存储位置">
                <span>{{ props.row.location }}</span>
              </el-form-item>
              <el-form-item label="剩余数量">
                <span>{{ props.row.quantity }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书编号" prop="bookID"> </el-table-column>
        <el-table-column label="图书名称" prop="name"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDeleteBook(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看借阅表 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="4.4rem"
        border
        v-show="type == 'checkBorrowingForm'"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="expand">
          <template slot-scope="props" class="demo-temp">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书编号">
                <span>{{ props.row.bookID }}</span>
              </el-form-item>
              <el-form-item label="用户编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="借出时间">
                <span>{{ props.row.begindate }}</span>
              </el-form-item>
              <el-form-item label="应还时间">
                <span>{{ props.row.finishdate }}</span>
              </el-form-item>
              <el-form-item label="是否逾期">
                <span>{{ props.row.overdue ? "是" : "否" }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书编号" prop="bookID"> </el-table-column>
        <el-table-column label="用户编号" prop="id"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click.stop="handleDeleteRecord(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 处理用户申请 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="4.3rem"
        border
        v-show="type == 'handleApply'"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="expand">
          <template slot-scope="props" class="demo-temp">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="图书编号">
                <span>{{ props.row.bookID }}</span>
              </el-form-item>
              <el-form-item label="用户编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="申请时间">
                <span>{{ props.row.begindate }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="图书编号" prop="bookID"> </el-table-column>
        <el-table-column label="用户编号" prop="id"> </el-table-column>
        <el-table-column label="操作" prop="desc">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click.stop="handleAgreeApply(scope.$index, tableData)"
              >同意</el-button
            ><el-button
              size="mini"
              type="danger"
              @click.stop="handleRefuseApply(scope.$index, tableData)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div
        style="margin-top: -0.4rem"
        v-show="type == 'checkAdministratorBook'"
      >
        <el-button @click="addBook">存入新书</el-button>
      </div>
      <div
        v-show="type == 'checkBorrowingForm'"
        style="margin-top: -0.1rem"
        class="notes"
      >
        注释：
        <div class="notes__div" style="background: #f0f9eb"></div>
        表示已归还，
        <div class="notes__div" style="background: rgb(253, 245, 230)"></div>
        表示已逾期
      </div>
      <div
        v-show="type == 'checkAllUser'"
        style="margin-top: -0.1rem"
        class="notes"
      >
        注释：
        <div class="notes__div" style="background: rgb(253, 245, 230)"></div>
        表示已逾期
      </div>
      <div
        v-show="type == 'handleApply'"
        style="margin-top: -0.1rem"
        class="notes"
      >
        注释：白色表示借书申请，
        <div class="notes__div" style="background: #f0f9eb"></div>
        表示还书申请
      </div>
    </div>
    <div class="yong"></div>
    <div class="info__close">点击空白处关闭</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showMsg: false,
      type: "",
      content: "",
      tableData: [],
    };
  },
  props: ["showType", "showTable"],
  watch: {
    showTable() {
      this.showMsg = this.showTable;
      this.cover();
      if (
        this.showType == "checkUserBook" ||
        this.showType == "checkAdministratorBook"
      ) {
        this.checkBook();
      }
      if (this.showType == "checkAllUser") {
        this.checkAllUser();
      }
      if (this.showType == "checkBorrowingForm") {
        this.checkBorrowingForm();
      }
      if (this.showType == "handleApply") {
        this.handleApply();
      }
    },
    showType() {
      this.type = this.showType;
      if (
        this.showType == "checkUserBook" ||
        this.showType == "checkAdministratorBook"
      ) {
        this.checkBook();
      }
      if (this.showType == "checkAllUser") {
        this.checkAllUser();
      }
      if (this.showType == "checkBorrowingForm") {
        this.checkBorrowingForm();
      }
      if (this.showType == "handleApply") {
        this.handleApply();
      }
    },
  },
  components: {},
  computed: {},
  mounted: {},
  methods: {
    cover() {
      this.$nextTick(() => {
        let bottom = document.documentElement.scrollHeight;
        this.$refs.info.style.height = bottom + "px";
      });
    },
    showMsgClick() {
      this.showMsg = false;
      this.$emit("showTableFalse");
    },
    handleRent(idx) {
      if (this.$store.state.user.is_freeze) {
        this.$emit("showContentTrue", "账户冻结，借阅失败");
        return;
      }
      if (this.tableData[idx].quantity == "0本") {
        this.$emit("showContentTrue", "数量不足，借阅失败");
        return;
      }
      axios
        .post("http://127.0.0.1:5000/rentBook", {
          userID: this.$store.state.user.userID,
          bookID: this.tableData[idx].bookID,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
        });
    },
    checkBook() {
      axios.get("http://127.0.0.1:5000/checkBook").then((res) => {
        this.tableData = res.data.message;
      });
    },
    checkAllUser() {
      axios.get("http://127.0.0.1:5000/checkAllUser").then((res) => {
        console.log(res.data.message);
        this.tableData = res.data.message;
      });
    },
    checkBorrowingForm() {
      axios.get("http://127.0.0.1:5000/checkBorrowingForm").then((res) => {
        this.tableData = res.data.message;
      });
    },
    handleApply() {
      axios.get("http://127.0.0.1:5000/handleApply").then((res) => {
        this.tableData = res.data.message;
      });
    },
    handleDeleteUser(idx, rows) {
      axios
        .post("http://127.0.0.1:5000/deleteUser", {
          userID: this.tableData[idx].id,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          rows.splice(idx, 1);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      if (this.tableData[rowIndex]?.return) {
        return "success-row";
      }
      if (this.tableData[rowIndex]?.overdue) {
        return "warning-row";
      }
      if (this.tableData[rowIndex]?.state == "returnBook") {
        return "success-row";
      }
      return "";
    },
    handleFreezeUser(idx) {
      axios
        .post("http://127.0.0.1:5000/freezeUser", {
          userID: this.tableData[idx].id,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          this.tableData[idx].is_freeze = true;
        });
    },
    handleOpenUser(idx) {
      axios
        .post("http://127.0.0.1:5000/openUser", {
          userID: this.tableData[idx].id,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          this.tableData[idx].is_freeze = false;
        });
    },
    handleDeleteBook(idx, rows) {
      axios
        .post("http://127.0.0.1:5000/deleteBook", {
          bookID: this.tableData[idx].bookID,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          rows.splice(idx, 1);
        });
    },
    addBook() {
      const str = Math.floor(Math.random() * 1000) + "";
      this.$emit("showContentTrue", "addBook" + str);
    },
    handleDeleteRecord(idx, rows) {
      axios
        .post("http://127.0.0.1:5000/deleteRecord", {
          bookID: this.tableData[idx].bookID,
          id: this.tableData[idx].id,
          borrowTime: this.tableData[idx].begindate,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          rows.splice(idx, 1);
        });
    },
    handleAgreeApply(idx, rows) {
      const STATUS = this.tableData[idx].state == "returnBook" ? 2 : 0;
      axios
        .post("http://127.0.0.1:5000/agreeApply", {
          bookID: this.tableData[idx].bookID,
          id: this.tableData[idx].id,
          begindate: this.tableData[idx].begindate,
          STATUS,
        })
        .then((res) => {
          const msg = res.data.message;
          this.$emit("showContentTrue", msg);
          rows.splice(idx, 1);
        });
    },
    handleRefuseApply(idx, rows) {
      axios.post("http://127.0.0.1:5000/refuseApply").then((res) => {
        const msg = res.data.message;
        this.$emit("showContentTrue", msg);
        rows.splice(idx, 1);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.yong {
  position: relative;
  background-image: url(../assets/Vector.png) !important;
  top: -2.84rem;
  z-index: 100;
  left: 8.6rem;
  height: 1.6rem;
  width: 1rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  user-select: none;
}

.info {
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  height: 7.2rem;
  width: 12.8rem;
  left: 0;
  right: 0;
  &__content {
    margin: 1.7rem 3.2rem 1.23rem 3.2rem;
    z-index: 6;
    position: relative;
    background: white;
    background-size: contain;
    width: 6.4rem;
    height: 4.8rem;
    padding: 0;
    display: grid;
    place-items: center;
    .demo-table-expand {
      position: relative;
      display: flex;
      flex-direction: column;
      font-size: 0;
      padding-left: 0.2rem;
      padding-bottom: 0;
      span {
        position: absolute;
        left: 0.2rem;
        width: 2rem;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  &__close {
    font-weight: 400;
    color: #ffeaca;
    line-height: 0.28rem;
    font-size: 0.24rem;
    position: absolute;
    top: 7rem;
    left: 5.46rem;
  }
}
.el-table /deep/ .warning-row {
  background: rgb(253, 245, 230) !important;
}
.el-table/deep/.el-table__row--striped {
  background: rgb(253, 245, 230) !important;
}
.el-table /deep/ .success-row {
  background: #f0f9eb;
}
.notes {
  font-size: 0.14rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  &__div {
    width: 0.14rem;
    height: 0.14rem;
    display: inline-block;
    border: black;
  }
}
</style>
