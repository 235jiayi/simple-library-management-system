const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("./mysql");
//头像上传，下载
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb" }));
let dataUrl = "";
router.post("/head", (req, res) => {
  dataUrl = req.body.result;
});
router.get("/head", (req, res) => {
  res.send(dataUrl);
});
//注册功能
router.post("/register", (req, res) => {
  const {
    name,
    password,
    email,
    telephone,
    bookdate,
    state,
    is_administrator,
  } = req.body;
  const sql0 = "SELECT COUNT(*) FROM reader";
  const sql1 = "insert into reader values(?,?,?,?,?,?,?,?)";
  db.query(sql0, (err, result) => {
    let id = result[0]["COUNT(*)"] - 0 + 1;
    if (id < 100) {
      id = "00" + id;
    } else {
      id = "0" + id;
    }
    db.query(
      sql1,
      [id, name, telephone, email, bookdate, state, password, is_administrator],
      (err, result) => {
        res.send(
          JSON.stringify({
            message: `注册成功，id为${id}`,
            status: 1,
          })
        );
      }
    );
  });
});
//重载注册页面的头像
router.post("/resetHead", (req, res) => {
  dataUrl = "";
  res.send(JSON.stringify({ status: 1 }));
});
//登录功能
router.post("/login", (req, res) => {
  const { userID, password } = req.body;
  const sql1 = "SELECT * from reader WHERE id=? AND password =?";
  const sql2 = "SELECT * from reader WHERE id=?";
  db.query(sql2, [userID], (err, result) => {
    if (result.length == 0) {
      res.send(
        JSON.stringify({
          message: "用户不存在",
          status: 0,
        })
      );
    } else {
      db.query(sql1, [userID, password], (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length == 0) {
          res.send(
            JSON.stringify({
              message: "用户名密码不正确",
              status: 0,
            })
          );
        } else {
          if (result[0].is_administrator == 1) {
            const [username, userID] = [result[0].name, result[0].id];
            const is_freeze = result[0].state == "正常" ? false : true;
            res.send(
              JSON.stringify({
                message: `欢迎登录  管理员${username}`,
                is_administrator: true,
                status: 1,
                username,
                is_freeze,
                userID,
              })
            );
          } else {
            const is_freeze = result[0].state == "正常" ? false : true;
            const [username, userID] = [result[0].name, result[0].id];
            res.send(
              JSON.stringify({
                message: `欢迎登录 ${username}`,
                is_administrator: false,
                username,
                status: 1,
                is_freeze,
                userID,
              })
            );
          }
        }
      });
    }
  });
});
//获取用户头像
router.get("/getHead/:username", (req, res) => {
  const username = req.params.username;
  const userList = JSON.parse(fs.readFileSync("./node/user.json"));
  for (let i of userList) {
    if (JSON.parse(i).username === username && JSON.parse(i).avatar != "") {
      res.send(JSON.stringify({ message: JSON.parse(i).avatar, status: 1 }));
      return;
    }
  }
  res.send(
    JSON.stringify({
      message: "",
      status: 0,
    })
  );
});
//还书
router.post("/returnBook", (req, res) => {
  const { userID, bookID } = req.body;
  const sql1 = "SELECT * FROM borrow WHERE id=? AND bookID=?";
  const sql2 = "UPDATE borrow SET STATUS=2 WHERE id=? AND bookID=?";
  db.query(sql1, [userID, bookID], (err, result) => {
    if (result.length == 0) {
      res.send(
        JSON.stringify({
          message: `您未借阅该书籍`,
          status: 0,
        })
      );
    } else {
      db.query(sql2, [userID, bookID], (err, result) => {
        res.send(
          JSON.stringify({
            message: `请求正在处理中`,
            status: 0,
          })
        );
      });
    }
  });
});
//修改密码
router.post("/changePassword", (req, res) => {
  const { userID, newPassword } = req.body;
  const sql = "UPDATE reader SET PASSWORD=? WHERE id=?";
  if (newPassword.length >= 20) {
    res.send(
      JSON.stringify({
        message: `修改失败,新密码过长`,
        status: 0,
      })
    );
    return;
  }
  db.query(sql, [newPassword, userID], (err, result) => {
    res.send(
      JSON.stringify({
        message: `修改成功,新密码为${newPassword}`,
        status: 1,
      })
    );
  });
});
//修改用户密码
router.post("/newPassword", (req, res) => {
  const userList = JSON.parse(fs.readFileSync("./node/user.json"));
  const { username, password } = req.body;
  for (let i in userList) {
    if (JSON.parse(userList[i]).username === username) {
      const tmp = JSON.parse(userList[i]);
      tmp.password = password;
      userList[i] = JSON.stringify(tmp);
      res.send(
        JSON.stringify({
          message: `修改成功,用户${username}新密码为${password}`,
          status: 1,
        })
      );
      break;
    }
  }
  fs.writeFileSync("./node/user.json", JSON.stringify(userList));
});
//启用用户
router.post("/openUser", (req, res) => {
  const { userID } = req.body;
  const sql = "UPDATE reader SET state='正常' WHERE id=?";
  db.query(sql, [userID], (err, result) => {
    res.send(
      JSON.stringify({
        message: `用户ID：${userID}已启用`,
        status: 1,
      })
    );
  });
});
//查看我的信息
router.get("/checkMyInfo/:userID", (req, res) => {
  const { userID } = req.params;
  let currentRent = "无";
  const sql0 = "select * from reader where id=?";
  const sql1 =
    "SELECT NAME FROM book WHERE bookID IN (SELECT bookID FROM borrow WHERE id=?)";
  db.query(sql1, [userID], (err, result) => {
    currentRent = "";
    if (result.length > 0) {
      for (let i of result) {
        currentRent += `《${i.NAME}》`;
      }
    }
  });
  db.query(sql0, [userID], (err, result) => {
    const { id, name, state, email, telephone, bookdata, password } = result[0];
    const msg = {
      userID: id,
      username: name,
      accountState: state,
      currentRent,
      email,
      telephone,
      bookdata,
      password,
    };
    res.send(
      JSON.stringify({
        message: msg,
        status: 1,
      })
    );
  });
});
//借书
router.post("/rentBook", (req, res) => {
  const { bookID, userID } = req.body;
  const time = new Date();
  let year = time.getFullYear();
  let year1 = time.getFullYear();
  let month = time.getMonth() + 1;
  let month1 = month + 1;
  if (month < 10) {
    month = "0" + month;
  }
  if (month1 < 10) {
    month1 = "0" + month1;
  }
  if (month1 == 13) {
    month1 = "01";
    year1 += 1;
  }
  const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
  const begindate = `${year}-${month}-${day}`;
  const finishdate = `${year1}-${month1}-${day}`;
  const sql =
    "INSERT INTO borrow(id,bookID,begindate,finishdate,status) VALUES (?,?,?,?,?)";
  db.query(sql, [userID, bookID, begindate, finishdate, 0], (err, result) => {
    res.send(
      JSON.stringify({
        message: "已提交借书申请，等待管理员处理",
        status: 1,
      })
    );
  });
});
//查询书单
router.get("/checkBook", (req, res) => {
  const sql = "select * from book";
  db.query(sql, (err, result) => {
    for (let i of result) {
      i.name = `《${i.name}》`;
      i.quantity = `${i.quantity}本`;
    }
    res.send(
      JSON.stringify({
        message: result,
        status: 1,
      })
    );
  });
});
//查看用户是否逾期
router.get("/overdue/:userID/:timeString", (req, res) => {
  const { userID, timeString } = req.params;
  const sql =
    "select * from borrow where id=? and finishdate<? and (status=1 or status=2)";
  db.query(sql, [userID, timeString], (err, result) => {
    if (result.length > 0)
      res.send(
        JSON.stringify({
          message: "您有书本已逾期，请尽快归还",
          status: 1,
        })
      );
  });
});
//查看所有用户
router.get("/checkAllUser", (req, res) => {
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
  const timeString = `${year}-${month}-${day}`;
  const sql0 = "select * from reader";
  const sql1 =
    "select * from borrow where id=? and finishdate<? and (status=1 or status=2)";
  db.query(sql0, (err, result) => {
    let promiseList = [];
    for (let i in result) {
      if (result[i]?.is_administrator == "1") {
        result.splice(i, 1);
      }
    }
    for (let i in result) {
      if (result[i].state == "冻结") {
        result[i].is_freeze = true;
      } else {
        result[i].is_freeze = false;
      }
    }
    for (let i in result) {
      promiseList.push(
        new Promise((resolve, reject) => {
          db.query(sql1, [result[i].id, timeString], (err, result1) => {
            if (result1.length > 0) {
              result[i].overdue = true;
            } else {
              result[i].overdue = false;
            }
            return resolve();
          });
        })
      );
    }
    Promise.all(promiseList)
      .then(() => {
        res.send(
          JSON.stringify({
            message: result,
            status: 1,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
//删除用户
router.post("/deleteUser", (req, res) => {
  const { userID } = req.body;
  const sql1 = "DELETE FROM reader WHERE id =?";
  db.query(sql1, [userID], (err, result) => {
    res.send(
      JSON.stringify({
        message: `用户ID：${userID}已删除`,
        status: 1,
      })
    );
  });
});
//封禁用户
router.post("/freezeUser", (req, res) => {
  const { userID } = req.body;
  const sql = "UPDATE reader SET state='冻结' WHERE id=?";
  db.query(sql, [userID], (err, result) => {
    res.send(
      JSON.stringify({
        message: `用户ID：${userID}已封禁`,
        status: 1,
      })
    );
  });
});
//删除书籍
router.post("/deleteBook", (req, res) => {
  const { bookID } = req.body;
  const sql = "DELETE FROM book WHERE bookID =?";
  db.query(sql, [bookID], (err, result) => {
    res.send(
      JSON.stringify({
        message: `书籍ID：${bookID}已删除`,
        status: 1,
      })
    );
  });
});
//增加书
router.post("/addBook", (req, res) => {
  const { name, location, quantity, writer, publisher } = req.body;
  const sql0 = "SELECT MAX(bookID) FROM book";
  const sql1 =
    "INSERT INTO book(bookID,name,publisher,location,inTime,writer,quantity) VALUES(?,?,?,?,?,?,?)";
  const sql2 = "SELECT * FROM book WHERE NAME=? AND publisher=? AND writer=?";
  const sql3 = "UPDATE book SET quantity=? WHERE bookID=?";
  if (
    name == "" ||
    location == "" ||
    writer == "" ||
    quantity == "" ||
    publisher == ""
  ) {
    res.send(
      JSON.stringify({
        message: "不能提交空值",
        status: 1,
      })
    );
    return;
  }
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
  const timeString = `${year}-${month}-${day}`;
  db.query(sql2, [name, publisher, writer], (err, result) => {
    if (result.length > 0) {
      const amount = result[0].quantity - 0 + (quantity - 0);
      const newLocation = result[0].location;
      const bookID = result[0].bookID;
      db.query(sql3, [amount, bookID], (err, result) => {
        res.send(
          JSON.stringify({
            message: `添加成功,书籍存储在${newLocation}`,
            status: 1,
          })
        );
      });
    } else {
      db.query(sql0, (err, result) => {
        let bookID = result[0]["MAX(bookID)"] - 0 + 1;
        if (bookID < 100) {
          bookID = "00" + bookID;
        } else {
          bookID = "0" + bookID;
        }
        db.query(
          sql1,
          [bookID, name, publisher, location, timeString, writer, quantity],
          (err, result) => {
            res.send(
              JSON.stringify({
                message: "添加成功",
                status: 1,
              })
            );
          }
        );
      });
    }
  });
});
//查看借阅表
router.get("/checkBorrowingForm", (req, res) => {
  const sql0 = "SELECT * FROM borrow WHERE STATUS !=0";
  const sql1 =
    "select * from borrow where id=? and bookID=? and finishdate<? and (status=1 or status=2)";
  const time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
  const timeString = `${year}-${month}-${day}`;
  db.query(sql0, (err, result) => {
    let promiseList = [];
    for (let i in result) {
      if (result[i].STATUS == "3") {
        result[i].return = true;
      } else {
        result[i].return = false;
      }
    }
    for (let i in result) {
      promiseList.push(
        new Promise((resolve, reject) => {
          db.query(
            sql1,
            [result[i].id, result[i].bookID, timeString],
            (err, result1) => {
              if (result1.length > 0) {
                result[i].overdue = true;
              } else {
                result[i].overdue = false;
              }
              return resolve();
            }
          );
        })
      );
    }
    Promise.all(promiseList)
      .then(() => {
        res.send(
          JSON.stringify({
            message: result,
            status: 1,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
//删除记录
router.post("/deleteRecord", (req, res) => {
  const { bookID, id, begindate } = req.body;
  const sql = "delete from borrow where bookID=? and id=? and begindate=?";
  db.query(sql, [bookID, id, begindate], (err, result) => {
    res.send(
      JSON.stringify({
        message: "删除记录成功",
        status: 1,
      })
    );
  });
});
//处理用户申请
router.get("/handleApply", (req, res) => {
  const sql = "select * from borrow where STATUS=0 or STATUS =2";
  db.query(sql, (err, result) => {
    for (let i in result) {
      if (result[i].STATUS == 0) {
        result[i].state = "borrowBook";
      } else {
        result[i].state = "returnBook";
      }
    }
    res.send(
      JSON.stringify({
        message: result,
        status: 1,
      })
    );
  });
});
//通过用户申请
router.post("/agreeApply", (req, res) => {
  const { bookID, id, begindate, STATUS } = req.body;
  const sql1 =
    "UPDATE borrow SET STATUS=3 WHERE bookID=? and id=? and begindate=?";
  const sql2 =
    "UPDATE borrow SET STATUS=1 WHERE bookID=? and id=? and begindate=?";
  if (STATUS == 2) {
    db.query(sql1, [bookID, id, begindate], (err, result) => {
      res.send(
        JSON.stringify({
          message: "已通过该还书申请",
          status: 1,
        })
      );
    });
  } else {
    db.query(sql2, [bookID, id, begindate], (err, result) => {
      res.send(
        JSON.stringify({
          message: "已通过该借书申请",
          status: 1,
        })
      );
    });
  }
});
//拒绝用户申请
router.post("/refuseApply", (req, res) => {
  res.send(
    JSON.stringify({
      message: "已拒绝申请",
      status: 1,
    })
  );
});
module.exports = router;
