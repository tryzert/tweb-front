<template>
  <div class="edit-task-container">
    <span class="title">{{ state.taskDetail.type === 0 ? "编辑任务" : "添加新任务" }}</span>
    <span @click="close" class="close-button"></span>
    <span @click="publish" class="publish-button">发布</span>
    <div class="remind-box">
      <div class="head">
        <input v-model="state.taskDetail.setRemind" type="checkbox" />
        <span>设置提醒</span>
      </div>
      <div v-show="state.taskDetail.setRemind" class="foot">
        <div class="left">
          <span>设置定时提醒</span>
          <input type="date" v-model="state.taskDetail.remindDate" />
        </div>
        <div class="right">
          <span>设置重复提醒</span>
          <select v-model="state.taskDetail.remindRepeat">
            <option value="-1">每天</option>
            <option value="0">不重复</option>
            <option value="1">周一</option>
            <option value="2">周二</option>
            <option value="3">周三</option>
            <option value="4">周四</option>
            <option value="5">周五</option>
            <option value="6">周六</option>
            <option value="7">周日</option>
            <option value="8">周一到周五</option>
            <option value="9">周末(周六周日)</option>
            <option value="10">每月该天</option>
            <option value="11">每年该天</option>
          </select>
        </div>
      </div>
    </div>
    <input v-model="state.taskDetail.tags" type="text" placeholder="标签可以为空,多个标签用#隔开" />
    <textarea v-model="state.taskDetail.task" placeholder="输入内容"></textarea>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import confirm from '../confirm'
import { message } from '../message'
import http from '../../http'

const emits = defineEmits(['emit-close']);
const props = defineProps(['taskDetail']);

const state = reactive(props);

const close = () => {
  emits('emit-close', -1, null);
}

const publish = () => {
  let data = {
    tags: "",
    task: "",
    set_remind: false,
    remind_date: "",
    remind_repeat: 0
  }
  let task = state.taskDetail.task.trim();
  if (task === "") {
    confirm({
      title: "内容不能为空",
      content: "请输入内容后再发布!"
    }).then(() => { }).catch(() => { })
    return;
  }
  data.task = task;
  let tags = state.taskDetail.tags.trim();
  if (tags) {
    data.tags = tags;
  }
  data.set_remind = state.taskDetail.setRemind;
  if (state.taskDetail.setRemind) {
    data.remind_date = state.taskDetail.remindDate;
    data.remind_repeat = Number(state.taskDetail.remindRepeat);
    if (data.remind_date == "" && data.remind_repeat == 0) {
      confirm({
        title: "提醒设置不能为空",
        content: "请选择一个日期或重复选项再发布!"
      }).then(() => { }).catch(() => { })
      return;
    }
    if (data.remind_repeat >= 10 && data.remind_date == "") {
      confirm({
        title: "日期不能为空",
        content: "请选择一个日期再发布!"
      }).then(() => { }).catch(() => { })
      return;
    }
  }
  //是编辑内容，要判断内容有无改变
  if (state.taskDetail.type === 0) {
    data.id = state.taskDetail.id;
    //判断内容有无改动
    emits('emit-close', 0, data);
  } else { //是新发布的内容，可以直接发布
    http.authPost("/new_task", data).then(res => {
      if (res.code === 1) {
        message.success({
          "text": "添加任务成功！"
        })
        emits('emit-close', 1, res.data);
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
</script>

<style lang="less" scoped>
.edit-task-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .title {
    font-weight: bolder;
    font-size: 1.3em;
    color: #27ae60;
  }

  .close-button {
    display: block;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 5px;
    // background-color: #353b48;
    cursor: pointer;
  }

  .close-button::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    left: 12px;
    top: 9px;
    border-left: 2px solid #576574;
    border-bottom: 2px solid #576574;
    transform: rotate(45deg);
  }

  .publish-button {
    display: block;
    width: 50px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background-color: #00a1d6;
    color: white;
    cursor: pointer;
  }

  .remind-box {
    width: 85%;
    margin-top: 40px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    border: 1px solid #00a1d6;
    border-radius: 7px;

    .head {
      padding-left: 20px;
      display: flex;
      align-items: center;
      position: relative;

      span {
        color: #222f3e;
        z-index: 0;
      }
    }

    .foot {
      width: 100%;
      display: flex;

      .left,
      .right {
        width: 50%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
          color: #222f3e;
        }
      }

      input {
        width: 95%;
        height: 22px;
        font-size: 1em;
        outline-style: none;
      }

      select {
        width: 95%;
        height: 24px;
        font-size: 1em;
        outline-style: none;
      }
    }
  }

  input[type="text"] {
    width: 85%;
    height: 40px;
    font-size: 1em;
    font-style: italic;
    outline-style: none;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #00a1d6;
  }

  textarea {
    width: 85%;
    height: 50%;
    resize: none;
    font-size: 1em;
    font-style: italic;
    color: #2f3542;
    outline-style: none;
    border-color: #00a1d6;
    border-radius: 5px;
    padding: 7px;
  }
}
</style>