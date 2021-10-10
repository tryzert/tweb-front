<template>
  <Reminder
    :remindNums="remindNums"
    v-show="state.showReminder"
    @emit-hide-reminder="toggleReminder(false)"
  />
  <EditTask
    :taskDetail="state.editTaskPageDetail"
    v-show="state.showEditTaskPage"
    @emit-close="handleEmitClose"
  />
  <div class="nav">
    <span class="title">todolist v2.0 alpha</span>
    <div class="menu">
      <input type="checkbox" />
      <span></span>
      <div class="menu-dropdown">
        <div @click="addTask" class="addTask">
          添加新任务
          <span></span>
        </div>
        <div @click="toggleReminder(true)" class="showReminder">查看提醒</div>
        <div class="other">
          <a @click="toNavPage">去导航页</a>
          <a @click="logout">退出登录</a>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="container">
      <div class="tabs-head">
        <div class="tabs-label">
          <svg
            t="1632146180279"
            class="icon"
            viewBox="0 0 1211 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1865"
            width="22"
            height="22"
          >
            <path
              d="M131.45833333 215.12500024a37.2023811 37.2023811 0 0 1 37.2023811-37.2023811h669.6428574a37.2023811 37.2023811 0 0 1 0 74.40476221h-669.6428574a37.2023811 37.2023811 0 0 1-37.2023811-37.20238111zM131.45833333 512.74404742a37.2023811 37.2023811 0 0 1 37.2023811-37.2023811h669.6428574a37.2023811 37.2023811 0 0 1 0 74.4047622h-669.6428574a37.2023811 37.2023811 0 0 1-37.2023811-37.2023811zM131.45833333 810.36309543a37.2023811 37.2023811 0 0 1 37.2023811-37.2023811h669.6428574a37.2023811 37.2023811 0 0 1 0 74.4047622h-669.6428574a37.2023811 37.2023811 0 0 1-37.2023811-37.2023811zM987.11309541 90.125a37.2023811 37.2023811 0 0 1 37.2023811 37.2023811v769.3452378a37.2023811 37.2023811 0 0 1-74.4047622 0V127.3273811a37.2023811 37.2023811 0 0 1 37.2023811-37.2023811z"
              p-id="1866"
              fill="#707070"
            />
            <path
              d="M1118.80952413 764.97619018a37.94642852 37.94642852 0 0 1 0 52.82738114l-105.65476228 104.91071402a36.83035739 36.83035739 0 0 1-52.08333287-52.08333288l104.91071401-105.65476228a37.94642852 37.94642852 0 0 1 52.82738114 0z"
              p-id="1867"
              fill="#707070"
            />
          </svg>
          <span :class="state.tabsIndex == 0 ? 'defaultFontStyle' : ''">
            全部
            <span
              v-show="state.tabsIndex == 0"
            >{{ allTaskList.length > 999 ? '999+' : (allTaskList.length > 0 ? allTaskList.length : "") }}</span>
          </span>
          <span :class="state.tabsIndex == 1 ? 'defaultFontStyle' : ''">
            未完成
            <span
              v-show="state.tabsIndex == 1"
            >{{ undoneTaskList.length > 999 ? '999+' : (undoneTaskList.length > 0 ? undoneTaskList.length : "") }}</span>
          </span>
          <span :class="state.tabsIndex == 2 ? 'defaultFontStyle' : ''">
            已完成
            <span
              v-show="state.tabsIndex == 2"
            >{{ doneTaskList.length > 999 ? '999+' : (doneTaskList.length > 0 ? doneTaskList.length : "") }}</span>
          </span>
          <span :class="state.tabsIndex == 3 ? 'defaultFontStyle' : ''">
            回收站
            <span
              v-show="state.tabsIndex == 3"
            >{{ deletedTaskList.length > 999 ? '999+' : (deletedTaskList.length > 0 ? deletedTaskList.length : "") }}</span>
          </span>
        </div>
        <div class="tabs-input">
          <input type="checkbox" />
          <div class="dropdown">
            <div class="dropdown-item">
              <input v-model="state.reverseList" type="checkbox" />
              <span>倒序{{ state.reverseList ? "✓" : "" }}</span>
            </div>
            <div class="dropdown-item">
              <input
                v-model="state.sortKeyWordIndex"
                type="radio"
                name="dropdownItemRadio"
                value="0"
              />
              <span>按创建时间{{ state.sortKeyWordIndex == 0 ? "✓" : "" }}</span>
            </div>
            <div class="dropdown-item">
              <input
                v-model="state.sortKeyWordIndex"
                type="radio"
                name="dropdownItemRadio"
                value="1"
              />
              <span>按更新时间{{ state.sortKeyWordIndex == 1 ? "✓" : "" }}</span>
            </div>
            <div class="dropdown-item">
              <input
                v-model="state.sortKeyWordIndex"
                type="radio"
                name="dropdownItemRadio"
                value="2"
              />
              <span>按标签{{ state.sortKeyWordIndex == 2 ? "✓" : "" }}</span>
            </div>
            <div v-show="state.tabsIndex == 3" class="dropdown-item">
              <input
                v-model="state.sortKeyWordIndex"
                type="radio"
                name="dropdownItemRadio"
                value="3"
              />
              <span>按删除时间{{ state.sortKeyWordIndex == 3 ? "✓" : "" }}</span>
            </div>
          </div>
          <input v-model="state.tabsIndex" value="0" type="radio" name="tabsRadio" checked />
          <input v-model="state.tabsIndex" value="1" type="radio" name="tabsRadio" />
          <input v-model="state.tabsIndex" value="2" type="radio" name="tabsRadio" />
          <input v-model="state.tabsIndex" value="3" type="radio" name="tabsRadio" />
          <span></span>
        </div>
      </div>
      <div class="tabs-body">
        <div v-show="state.tabsIndex == 0" class="tabs-item">
          <span v-show="allTaskList.length <= 0">哪有什么东西...</span>
          <TaskCard
            v-for="item in allTaskList"
            :key="item"
            :taskDetail="item"
            @emit-done="handleEmitDone"
            @emit-settop="handleEmitSetTop"
            @emit-edit="handleEmitEdit"
            @emit-recover="handleEmitRecover"
            @emit-delete="handleEmitDelete"
          />
        </div>
        <div v-show="state.tabsIndex == 1" class="tabs-item">
          <span v-show="undoneTaskList.length <= 0">这里是空的...</span>
          <TaskCard
            v-for="item in undoneTaskList"
            :key="item"
            :taskDetail="item"
            @emit-done="handleEmitDone"
            @emit-settop="handleEmitSetTop"
            @emit-edit="handleEmitEdit"
            @emit-recover="handleEmitRecover"
            @emit-delete="handleEmitDelete"
          />
        </div>
        <div v-show="state.tabsIndex == 2" class="tabs-item">
          <span v-show="doneTaskList.length <= 0">什么都没发现...</span>
          <TaskCard
            v-for="item in doneTaskList"
            :key="item"
            :taskDetail="item"
            @emit-done="handleEmitDone"
            @emit-settop="handleEmitSetTop"
            @emit-edit="handleEmitEdit"
            @emit-recover="handleEmitRecover"
            @emit-delete="handleEmitDelete"
          />
        </div>
        <div v-show="state.tabsIndex == 3" class="tabs-item">
          <span v-show="deletedTaskList.length <= 0">空无一物...</span>
          <TaskCard
            v-for="item in deletedTaskList"
            :key="item"
            :taskDetail="item"
            @emit-done="handleEmitDone"
            @emit-edit="handleEmitEdit"
            @emit-recover="handleEmitRecover"
            @emit-delete="handleEmitDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import http from '../http'
import { reactive, onMounted, computed, watch } from 'vue'
import { message } from '../components/message'
import confirm from '../components/confirm'
import Reminder from '../components/reminder/Reminder.vue'
import TaskCard from '../components/task/TaskCard.vue'
import EditTask from '../components/task/EditTask.vue'
import cpt from '../time'


const state = reactive({
  showReminder: false,
  showEditTaskPage: false,
  tabsIndex: 0,
  reverseList: true,
  sortKeyWordIndex: 0,
  taskList: [],
  editTaskPageDetail: {}
})


const remindNums = computed(() => {
  return cpt(state.taskList);
})


const sortListByType = (list, type) => {
  switch (type) {
    case 0:
      list.sort((a, b) => {
        return a.create_time_unix - b.create_time_unix;
      })
      break;
    case 1:
      list.sort((a, b) => {
        return a.update_time_unix - b.update_time_unix;
      })
      break;
    case 2: //by tags
      list.sort((a, b) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      })
      break;
    default:
      list.sort((a, b) => {
        return a.delete_time_unix - b.delete_time_unix;
      })
  }
}


//除回收站以外的所有任务列表
const allTaskList = computed(() => {
  let setTopList = state.taskList.filter(e => {
    return !e.deleted && e.set_top_level > 0;
  })
  setTopList.sort((a, b) => {
    return b.set_top_level - a.set_top_level;
  });
  let unsetTopList = state.taskList.filter(e => {
    return !e.deleted && e.set_top_level == 0;
  })
  sortListByType(unsetTopList, Number(state.sortKeyWordIndex));
  if (state.reverseList) {
    unsetTopList.reverse();
  }
  return setTopList.concat(unsetTopList);
})


//除回收站以外的所有任务中的，未完成的任务列表
const undoneTaskList = computed(() => {
  let setTopList = state.taskList.filter(e => {
    return !e.deleted && !e.done && e.set_top_level > 0;
  })
  setTopList.sort((a, b) => {
    return b.set_top_level - a.set_top_level;
  });
  let unsetTopList = state.taskList.filter(e => {
    return !e.deleted && !e.done && e.set_top_level == 0;
  })
  sortListByType(unsetTopList, Number(state.sortKeyWordIndex));
  if (state.reverseList) {
    unsetTopList.reverse();
  }
  return setTopList.concat(unsetTopList);
})


//除回收站以外的所有任务中的，完成的任务列表
const doneTaskList = computed(() => {
  let setTopList = state.taskList.filter(e => {
    return !e.deleted && e.done && e.set_top_level > 0;
  })
  setTopList.sort((a, b) => {
    return b.set_top_level - a.set_top_level;
  });
  let unsetTopList = state.taskList.filter(e => {
    return !e.deleted && e.done && e.set_top_level == 0;
  })
  sortListByType(unsetTopList, Number(state.sortKeyWordIndex));
  if (state.reverseList) {
    unsetTopList.reverse();
  }
  return setTopList.concat(unsetTopList);
})

const deletedTaskList = computed(() => {
  let list = state.taskList.filter((e) => {
    return e.deleted;
  })
  sortListByType(list, Number(state.sortKeyWordIndex));
  if (state.reverseList) {
    list.reverse();
  }
  return list;
})


const handleEmitClose = (type, data) => {
  if (type == 0) {
    let index = state.taskList.findIndex((item) => {
      return item.id == data.id;
    })
    if (index == -1) {
      message.error({
        "text": "编辑了不存在的任务！"
      })
      return;
    }
    if (data.task != state.taskList[index].task || data.tags != state.taskList[index].tags || data.set_remind != state.taskList[index].set_remind) {
      http.authPost("/edit_task", data).then(res => {
        if (res.code === 1) {
          message.success({
            "text": "任务修改成功！"
          })
          state.taskList[index] = res.data;
          state.showEditTaskPage = false;
        } else {
          message.error({
            "text": res.tip
          })
        }
      }).catch(err => {
        message.error({
          "text": "网络请求失败！"
        })
      })
      return;
    }
    if (!data.set_remind) {
      confirm({
        title: "内容无改动",
        content: "内容无改动无需重新发布!"
      }).then(() => { }).catch(() => { })
    } else {
      if (data.remind_date == state.taskList[index].remind_date && data.remind_repeat == state.taskList[index].remind_repeat) {
        confirm({
          title: "内容无改动",
          content: "内容无改动无需重新发布!"
        }).then(() => { }).catch(() => { })
      } else {
        http.authPost("/edit_task", data).then(res => {
          if (res.code === 1) {
            message.success({
              "text": "任务修改成功！"
            })
            state.taskList[index] = res.data;
            state.showEditTaskPage = false;
          } else {
            message.error({
              "text": res.tip
            })
          }
        }).catch(err => {
          message.error({
            "text": "网络请求失败！"
          })
        })
      }
    }
  } else if (type == 1) {
    state.showEditTaskPage = false;
    state.taskList.push(data);
  } else {
    confirm({
      title: "内容未保存",
      content: "确认要离开吗？"
    }).then(() => {
      state.showEditTaskPage = false;
    }).catch(() => { })
  }
}


const handleEmitDone = (id) => {
  let index = state.taskList.findIndex((item) => {
    return item.id == id;
  })
  http.authPost("/task_done", {
    id: id,
    done: !state.taskList[index].done
  }).then(resp => {
    if (resp.code == 1) {
      // 重新更换整个object对象,不然无法触发v-for :key = item 的diff算法
      let obj = { ...state.taskList[index] };
      obj.done = !obj.done;
      state.taskList[index] = obj; //这句去掉会影响排序紊乱 
      message.success({
        "text": "数据同步成功！"
      })
    } else {
      message.error({
        "text": resp.tip
      })
    }
  }).catch(err => {
    message.error({
      "text": "网络请求失败！"
    })
  })


}

const handleEmitSetTop = (id) => {
  let index = state.taskList.findIndex((item) => {
    return item.id == id;
  })
  let flag = state.taskList[index].set_top_level == 0;
  http.authPost("/set_task_top", { id: id, set_top: flag }).then(resp => {
    if (resp.code == 1) {
      if (flag) {
        state.taskList[index].set_top_level = resp.data;
        message.success({
          "text": "任务置顶成功！"
        })
      } else {
        state.taskList[index].set_top_level = 0;
        message.success({
          "text": "取消置顶成功！"
        })
      }
    } else {
      message.error({
        "text": resp.tip
      })
    }
  }).catch(err => {
    message.error({
      "text": "网络请求失败！"
    })
  })
}

const handleEmitEdit = (id) => {
  let index = state.taskList.findIndex((item) => {
    return item.id == id;
  })
  let item = state.taskList[index];
  // editTaskPageDetail.type = 0;
  // editTaskPageDetail.id = id;
  // editTaskPageDetail.task = item.task;
  // editTaskPageDetail.tags = item.tags;
  // editTaskPageDetail.setRemind = item.set_remind;
  // editTaskPageDetail.remindDate = item.remind_date;
  // editTaskPageDetail.remindRepeat = item.remind_repeat;
  state.editTaskPageDetail = {
    type: 0,
    id: item.id,
    task: item.task,
    tags: item.tags,
    setRemind: item.set_remind,
    remindDate: item.remind_date,
    remindRepeat: item.remind_repeat
  }
  state.showEditTaskPage = true;
}

const handleEmitRecover = (id) => {
  let index = state.taskList.findIndex((item) => {
    return item.id == id;
  })
  http.authPost("/recover_task", { id: id }).then(resp => {
    if (resp.code == 1) {
      state.taskList[index].deleted = false;
      message.success({
        "text": "任务恢复成功！"
      })
    } else {
      message.error({
        "text": resp.tip
      })
    }
  }).catch(err => {
    message.error({
      "text": "网络请求失败！"
    })
  })
}


const handleEmitDelete = (id) => {
  let index = state.taskList.findIndex((item) => {
    return item.id == id;
  })
  if (state.taskList[index].deleted) {
    http.authPost("/delete_task_forever", { id: state.taskList[index].id }).then(resp => {
      if (resp.code == 1) {
        state.taskList.splice(index, 1);
        message.success({
          "text": "任务已被永久删除！"
        })
      } else {
        message.error({
          "text": resp.tip
        })
      }
    }).catch(err => {
      message.error({
        "text": "网络请求失败！"
      })
    })
  } else {
    http.authPost("/delete_task", { id: state.taskList[index].id }).then(resp => {
      if (resp.code == 1) {
        state.taskList[index] = resp.data;
        message.success({
          "text": "任务已被移到回收站！"
        })
      } else {
        message.error({
          "text": resp.tip
        })
      }
    }).catch(err => {
      message.error({
        "text": "网络请求失败！"
      })
    })
  }
}

const addTask = () => {
  // editTaskPageDetail.type = 1;
  // editTaskPageDetail.task = "";
  // editTaskPageDetail.tags = "";
  // editTaskPageDetail.setRemind = false;
  // editTaskPageDetail.remindDate = "";
  // editTaskPageDetail.remindRepeat = 0;
  state.editTaskPageDetail = {
    type: 1,
    task: "",
    tags: "",
    setRemind: false,
    remindDate: "",
    remindRepeat: 0
  }
  state.showEditTaskPage = true;
}

const toggleReminder = (value) => {
  state.showReminder = value;
}

const toNavPage = () => {
  window.location.replace("/");
}

watch(() => state.tabsIndex, (newVal, oldVal) => {
  if (oldVal == 3) {
    if (state.sortKeyWordIndex == 3) {
      state.sortKeyWordIndex = 0;
    }
  }
})

const logout = () => {
  localStorage.clear()
  window.location.replace("/login");
}

const updateList = () => {
  state.taskList = [];
  http.authGet("/all_tasks").then(resp => {
    if (resp.code == 1) {
      state.taskList = resp.data;
      message.success({
        "text": "数据获取成功！"
      })
    } else {
      message.error({
        "text": resp.tip
      })
    }
  }).catch(err => {
    console.log(err);
    message.error({
      "text": "网络请求失败！"
    })
  })
}

onMounted(() => {
  updateList();
})

</script>


<style lang="less" scoped>
.nav {
  width: 100%;
  height: 40px;
  background-color: #3498db;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  .title {
    margin-left: 10px;
    color: wheat;
    font-family: "Monaco";
    font-size: 1.3em;
    font-weight: bolder;
  }

  .menu {
    width: 36px;
    height: 28px;
    margin-right: 10px;
    // border: 2px solid;
    background-color: #576574;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    > input[type="checkbox"] {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      cursor: pointer;
      z-index: 2;
    }

    > span {
      height: 2px;
      width: 55%;
      background-color: #fff;
      position: relative;
    }

    > span::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      top: -6px;
      background-color: #fff;
      transition: all 0.3s linear;
    }

    > span::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 100%;
      top: 6px;
      background-color: #fff;
      transition: all 0.3s linear;
    }

    .menu-dropdown {
      padding: 8px;
      right: 0px;
      top: calc(100% + 3px);
      background-color: #576574;
      position: absolute;
      // width: 280px;
      transform: scale(0);
      transform-origin: calc(100% - 18px) 0;
      border-radius: 3px 3px 8px 8px;
      transition: all 0.3s linear;
      // overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;

      > div {
        height: 70px;
        overflow: hidden;
        color: #fff;
        font-weight: bold;
      }

      .addTask {
        width: 150px;
        height: 30px;
        margin: 5px;
        border: 1px solid;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          margin: auto 5px;
          display: inline-block;
          width: 14px;
          height: 14px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        span::before {
          content: "";
          position: absolute;
          width: 2px;
          height: 100%;
          background-color: #fff;
        }

        span::after {
          content: "";
          position: absolute;
          height: 2px;
          width: 100%;
          background-color: #fff;
        }
      }

      .showReminder {
        width: 150px;
        height: 30px;
        margin: 5px;
        border: 1px solid;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      // todo
      .searchTask {
        display: flex;
        justify-content: center;
        align-items: center;

        input[type="text"] {
          width: 140px;
          height: 30px;
          margin: 5px;
          border-radius: 5px;
          font-size: 1em;
          text-align: center;
          color: #2980b9;
          font-style: italic;
          outline-style: none;
          border: 0;
          background-color: none;
          transition: all 0.35s linear;
        }

        input[type="text"]:focus {
          width: 260px;
        }

        span {
          margin: 5px;
          width: 30px;
          height: 30px;
          border: 1px solid;
          border-radius: 5px;
          position: relative;
          cursor: pointer;
        }

        span::before {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          left: 4px;
          top: 4px;
          border: 2px solid;
        }

        span::after {
          content: "";
          position: absolute;
          width: 2px;
          height: 9px;
          right: 7px;
          top: 17px;
          background-color: #fff;
          transform: rotate(-45deg);
        }
      }

      .other {
        width: 100%;
        height: 30px;
        position: relative;
        display: flex;
        // flex-direction: row-reverse;
        justify-content: center;
        align-items: center;

        a {
          margin: 5px 7px;
          transition: all 0.35s linear;
          color: #95a5a6;
          border-bottom: 1px solid;
          cursor: pointer;
        }
        a:nth-child(1) {
          color: #f1c40f;
        }
      }
    }

    > input[type="checkbox"]:checked ~ span {
      background-color: #576574;
    }

    > input[type="checkbox"]:checked ~ span::before {
      transform: rotate(-45deg);
      top: 0;
    }

    > input[type="checkbox"]:checked ~ span::after {
      transform: rotate(45deg);
      top: 0;
    }

    > input[type="checkbox"]:checked ~ .menu-dropdown {
      // width: 160px;
      // height: auto;
      // height: 150px;
      transform: scale(1);
    }
  }
}

.main {
  height: calc(100% - 40px);
  width: 100%;
  position: relative;
  top: 40px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .container {
    min-height: 100%;
    margin: 0 auto;
    padding: 0 10px;
    position: relative;
    // border: 1px solid;

    .tabs-head {
      height: 40px;
      margin-bottom: 5px;
      border-bottom: 1px solid #dfe6e9;
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      // border: 1px solid;
      background-color: #fff;
      z-index: 2;

      .tabs-label {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;

        svg {
          max-height: 100%;
          flex: 1;
        }
        > span {
          flex: 1;
          text-align: center;
          position: relative;

          > span {
            position: absolute;
            top: -8px;
            right: 2px;
            font-size: 0.8em;
            color: #cd6133;
          }
        }
      }

      .tabs-input {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;

        .dropdown {
          width: 120px;
          top: calc(100% + 6px);
          left: -2px;
          border-radius: 5px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
          position: absolute;
          background-color: #fff;
          transition: all 0.25s linear;
          transform: scaleY(0);
          transform-origin: 20px 0;
          overflow: hidden;

          .dropdown-item {
            height: 40px;
            overflow: hidden;
            line-height: 40px;
            padding: 2px;
            cursor: pointer;
            border-top: 1px solid grey;
            position: relative;

            input {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0;
            }

            span {
              display: block;
              width: 100%;
              height: 100%;
              color: grey;
              text-align: center;
            }

            input:checked ~ span {
              color: #009432;
              font-style: italic;
              font-weight: bold;
            }
          }

          .dropdown-item:nth-child(1) {
            border-top: none;
          }
        }

        > input {
          height: 100%;
          flex: 1;
          opacity: 0;
          cursor: pointer;
        }

        > span {
          display: inline-block;
          position: absolute;
          height: calc(100% - 3px);
          width: 20%;
          left: 20%;
          top: 1px;
          border-bottom: 3px solid green;
          transition: all 0.45s linear;
        }

        input[type="checkbox"]:checked ~ .dropdown {
          display: block;
          transform: scaleY(1);
        }

        input[type="radio"]:nth-child(4):checked ~ span {
          left: 40%;
        }

        input[type="radio"]:nth-child(5):checked ~ span {
          left: 60%;
        }

        input[type="radio"]:nth-child(6):checked ~ span {
          left: 80%;
        }
      }
    }

    .tabs-body {
      height: auto;

      .tabs-item {
        > span {
          display: block;
          text-align: center;
          color: #e74c3c;
          font-size: 1.2em;
          font-style: italic;
          font-weight: bold;
        }
      }
    }
  }
}

@media screen and (min-width: 701px) {
  .container {
    width: 680px;
  }
}

.defaultFontStyle {
  color: green;
  font-weight: bold;
}
</style>
