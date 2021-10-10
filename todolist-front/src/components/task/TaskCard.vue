<template>
  <div :class="remindToday ? 'outer-box task-remind' : 'outer-box'" :id="done ? 'taskDone' : ''">
    <div class="taskcard" :id="showDetail ? 'showDetail' : ''">
      <div class="left">
        <span v-show="taskDetail.set_top_level > 0 && !taskDetail.deleted" class="set-top">置顶</span>
        <span v-show="remindToday" class="remind">新提醒</span>
        <input v-show="!taskDetail.deleted" v-model="done" type="checkbox" />
        <span @click="handleDoneStatusClick" class="switch"></span>
      </div>
      <div class="center">
        <div class="time">
          <span>创建:{{ taskDetail.create_time }}</span>
          <span v-show="taskDetail.update_time">更新:{{ taskDetail.update_time }}</span>
          <span v-show="taskDetail.set_remind">提醒:{{ formatRemindTip }}</span>
          <span v-show="taskDetail.deleted">删除:{{ taskDetail.delete_time }}</span>
          <span v-show="taskDetail.deleted">{{ taskDetail.delete_forever_remaining_days }}天后自动永久删除</span>
        </div>
        <div class="content">{{ taskDetail.task }}</div>
        <div class="tags">
          <span v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div class="right">
        <input v-model="showMoreOperation" type="checkbox" />
        <svg
          t="1632047581636"
          class="icon"
          viewBox="0 0 1102 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3559"
          width="20"
          height="20"
        >
          <path
            d="M551.305846 669.538462A157.853538 157.853538 0 0 0 708.923077 512c0-86.803692-70.656-157.538462-157.459692-157.538462A157.853538 157.853538 0 0 0 393.846154 512c0 86.803692 70.656 157.538462 157.459692 157.538462z m0 78.76923A236.465231 236.465231 0 0 1 315.076923 512c0-130.284308 106.023385-236.307692 236.386462-236.307692A236.465231 236.465231 0 0 1 787.692308 512c0 130.284308-106.023385 236.307692-236.386462 236.307692z m287.271385 110.198154c-11.185231-56.792615-10.633846-123.982769 16.541538-170.850461 27.569231-48.049231 86.488615-82.077538 142.808616-101.060923 2.599385-17.604923 4.647385-35.288615 6.144-53.011693a288.689231 288.689231 0 0 0 0.94523-21.661538c0-6.222769-0.315077-13.548308-0.94523-21.897846a630.468923 630.468923 0 0 0-6.144-52.775385c-57.028923-19.534769-115.081846-53.011692-142.729847-100.903385-27.096615-46.867692-27.569231-113.191385-16.620307-170.535384l-130.756923-76.091077c-44.110769 38.281846-102.006154 71.207385-156.514462 71.207384-54.035692 0-111.300923-32.374154-155.963077-70.892307L264.113231 165.415385c11.185231 56.792615 10.633846 123.982769-16.541539 170.850461-27.569231 48.049231-86.488615 82.077538-142.808615 101.060923-2.599385 17.604923-4.647385 35.288615-6.144 53.011693a304.521846 304.521846 0 0 0-0.945231 21.661538c0 6.222769 0.315077 13.548308 0.945231 21.897846 1.299692 17.683692 3.347692 35.288615 6.144 52.775385 57.028923 19.534769 115.081846 53.011692 142.729846 100.903384 27.096615 46.867692 27.569231 113.191385 16.620308 170.535385l130.756923 76.091077c44.110769-38.281846 102.006154-71.207385 156.514461-71.207385 54.193231 0 111.694769 32.610462 156.041847 70.892308l131.072-75.460923 0.078769 0.078769z m-132.253539 158.011077a63.803077 63.803077 0 0 1-42.456615-15.911385c-16.541538-15.202462-72.546462-58.761846-112.403692-58.761846-40.172308 0-96.098462 43.559385-112.403693 58.761846a63.409231 63.409231 0 0 1-66.323692 11.185231l-3.229538-1.575384-161.476924-93.577847a64.196923 64.196923 0 0 1-23.315692-63.015384c4.883692-21.740308 14.572308-92.081231-5.356308-126.582154-19.849846-34.500923-85.700923-61.203692-107.126153-68.056615a66.323692 66.323692 0 0 1-43.559385-49.624616c-0.393846-2.363077-9.688615-57.107692-9.688615-97.28 0-40.172308 9.294769-94.759385 9.688615-97.201231a66.323692 66.323692 0 0 1 43.638154-49.624615c21.346462-6.695385 87.197538-33.398154 107.126154-68.135385 20.007385-34.658462 10.397538-104.763077 5.277538-126.582153a63.645538 63.645538 0 0 1 23.315692-63.015385l2.993231-2.048L372.499692 12.209231a63.409231 63.409231 0 0 1 66.402462 11.185231c16.541538 15.202462 72.546462 58.761846 112.403692 58.761846 40.172308 0 96.098462-43.559385 112.403692-58.761846A63.409231 63.409231 0 0 1 730.033231 12.209231l3.229538 1.575384 161.476923 93.577847c19.022769 14.966154 28.041846 39.305846 23.315693 63.015384-4.883692 21.740308-14.572308 92.081231 5.356307 126.582154 19.849846 34.500923 85.700923 61.203692 107.126154 68.056615 22.291692 7.640615 38.872615 26.505846 43.559385 49.624616 0.393846 2.363077 9.688615 57.107692 9.688615 97.28 0 40.172308-9.294769 94.759385-9.688615 97.201231a66.323692 66.323692 0 0 1-43.638154 49.624615c-21.346462 6.695385-87.197538 33.398154-107.126154 68.135385-20.007385 34.658462-10.397538 104.763077-5.277538 126.582153a63.803077 63.803077 0 0 1-23.315693 63.015385l-2.99323 2.048-161.476924 93.262769a64.590769 64.590769 0 0 1-23.945846 4.726154z"
            fill="#515151"
            p-id="3560"
          />
        </svg>
      </div>
    </div>
    <div v-show="showMoreOperation" class="more-operation">
      <span @click="toggleDetail">详情</span>
      <span
        @click="setTop"
        v-show="!taskDetail.deleted"
      >{{ taskDetail.set_top_level > 0 ? "取消" : "" }}置顶</span>
      <span v-if="!taskDetail.deleted" @click="editTask">编辑</span>
      <span v-else @click="recoverTask">恢复</span>
      <span @click="deleteTask">{{ taskDetail.deleted ? "永久" : "" }}删除</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import confirm from '../confirm'
import { message } from '../message'

const props = defineProps({
  taskDetail: Object
})

const emits = defineEmits(['emit-done', 'emit-settop', 'emit-edit', 'emit-recover', 'emit-delete'])

const done = ref(props.taskDetail.done)
const showMoreOperation = ref(false)
const showDetail = ref(false)

const tags = computed(() => {
  let tagsList = [];
  props.taskDetail.tags.split("#").forEach(e => {
    if (e.trim()) {
      tagsList.push(e.trim());
    }
  });
  return tagsList;
})

const formatRemindTip = computed(() => {
  let tip = "";
  if (props.taskDetail.set_remind) {
    if (props.taskDetail.remind_date) {
      tip = props.taskDetail.remind_date.replace("-", "年").replace("-", "月") + "日";
    }
    switch (props.taskDetail.remind_repeat) {
      case -1:
        tip = "每天重复";
        break;
      case 0:
        break;
      case 1:
        tip = "每周一";
        break;
      case 2:
        tip = "每周二";
        break;
      case 3:
        tip = "每周三";
        break;
      case 4:
        tip = "每周四";
        break;
      case 5:
        tip = "每周五";
        break;
      case 6:
        tip = "每周六";
        break;
      case 7:
        tip = "每周日";
        break;
      case 8:
        tip = "每周一到周五";
        break;
      case 9:
        tip = "每周六周日";
        break;
      case 10:
        tip = "每月" + props.taskDetail.remind_date.slice(-2) + "日";
        break;
      default:
        tip = "每年" + props.taskDetail.remind_date.slice(5).replace("-", "月") + "日";
    }
  }
  return tip;
})

const remindToday = computed(() => {
  if (props.taskDetail.done || props.taskDetail.deleted) {
    return false;
  }
  if (props.taskDetail.set_remind) {
    let now = new Date();
    let year = Number(props.taskDetail.remind_date.slice(0, 4));
    let month = Number(props.taskDetail.remind_date.slice(5, 7));
    let day = Number(props.taskDetail.remind_date.slice(8));
    if (props.taskDetail.remind_repeat == 0) {
      return now.getFullYear() == year && now.getMonth() + 1 == month && now.getDate() == day;
    } else {
      if (props.taskDetail.remind_repeat == -1) return true;
      if (props.taskDetail.remind_repeat < 7) {
        return now.getDay() == props.taskDetail.remind_repeat;
      }
      if (props.taskDetail.remind_repeat == 7) {
        return now.getDay() == 0;
      }
      if (props.taskDetail.remind_repeat == 8) {
        return now.getDay() >= 1 && now.getDay() <= 5;
      }
      if (props.taskDetail.remind_repeat == 9) {
        return now.getDay() == 0 || now.getDay() == 6;
      }
      if (props.taskDetail.remind_repeat == 10) {
        return day == now.getDate();
      }
      if (props.taskDetail.remind_repeat == 11) {
        return day == now.getDate() && month == now.getMonth() + 1;
      }
    }
  }
  return false;
})

const toggleDetail = () => {
  if (showDetail.value) {
    showDetail.value = false
  } else {
    showDetail.value = true
  }
}

const handleDoneStatusClick = () => {
  message.error({
    "text": "回收站里的任务无法直接编辑。"
  })
}

const setTop = () => {
  showMoreOperation.value = false;
  emits('emit-settop', props.taskDetail.id);
}

const editTask = () => {
  emits('emit-edit', props.taskDetail.id);
}

const recoverTask = () => {
  emits('emit-recover', props.taskDetail.id);
}

const deleteTask = () => {
  if (props.taskDetail.deleted) {
    confirm({
      "title": "删除这个任务？",
      "content": "任务会被永久删除，你无法在回收站中找到或恢复它。"
    }).then((res) => {
      console.log(res);
      emits('emit-delete', props.taskDetail.id)
    }).catch((err) => {
      console.log(err)
    })

  } else {
    confirm({
      "title": "移除这个任务？",
      "content": "任务会被移除，你可以在回收站中恢复或者永久删除。"
    }).then((res) => {
      console.log(res);
      emits('emit-delete', props.taskDetail.id)
    }).catch((err) => {
      console.log(err)
    })
  }
}


watch(done, (newVal, oldVal) => {
  emits('emit-done', props.taskDetail.id);
})

watch(showMoreOperation, () => {
  showDetail.value = false
})

</script>


<style lang="less" scoped>
@keyframes mention-move {
  0%,
  50%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(0);
  }
}

.task-remind {
  background-color: #efdcf8;
}

.outer-box {
  margin-bottom: 10px;
  border-radius: 15px 8px 15px 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;

  #showDetail {
    height: auto;

    .center {
      .content {
        overflow: visible;
        height: auto;
      }
    }
  }

  .taskcard {
    min-height: 85px;
    display: flex;
    padding: 5px 3px;
    transition: all 0.3s linear;

    .left {
      height: auto;
      width: 50px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .set-top {
        position: absolute;
        top: 0;
        border: 1px solid;
        padding: 0 3px;
        color: #ee5253;
        font-size: 0.9em;
        font-weight: bold;
      }

      .remind {
        position: absolute;
        bottom: 0;
        padding: 0 3px;
        border-radius: 3px;
        font-size: 0.8em;
        // font-style: italic;
        color: #fff;
        background-color: #ff3838;
        font-weight: bold;
        animation: mention-move 0.35s linear infinite;
      }

      input[type="checkbox"] {
        width: 44px;
        height: 22px;
        position: absolute;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }

      input[type="checkbox"]:checked ~ .switch {
        background-color: rgba(114, 102, 102, 0.3);
      }

      input[type="checkbox"]:checked ~ .switch::after {
        left: calc(100% - 20px);
      }

      .switch {
        position: absolute;
        display: block;
        width: 44px;
        height: 22px;
        border-radius: 20px;
        transition: all 0.3s linear;
        background-color: #13ce66;
        overflow: hidden;
      }

      .switch::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #ffffff;
        transition: all 0.3s linear;
      }
    }

    .center {
      flex: 1;
      display: flex;
      flex-direction: column;

      .time {
        font-size: 0.8em;

        span {
          margin-right: 7px;
          text-decoration: underline;
        }

        span:nth-child(1) {
          color: #159e43;
        }

        span:nth-child(2) {
          color: #f58b28;
        }

        span:nth-child(3) {
          color: #d35400;
        }

        span:nth-child(4) {
          color: #4a69bd;
        }

        span:nth-child(5) {
          color: #747d8c;
        }
      }

      .content {
        width: 100%;
        height: 45px;
        overflow: hidden;
        color: #4b4b4b;
        word-break: break-all;
      }

      .tags {
        font-size: 0.9em;
        color: #e74c3c;
        margin-top: 3px;

        span {
          margin-right: 5px;
          padding: 0px 5px;
          border-radius: 0.9em;
          border: 1px solid rgba(208, 48, 80, 0.23);
          background-color: rgba(208, 48, 80, 0.08);
        }
      }
    }

    .right {
      height: auto;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      input[type="checkbox"] {
        width: 24px;
        height: 24px;
        position: absolute;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
      }

      input[type="checkbox"]:checked ~ svg {
        transform: rotate(90deg);
      }

      svg {
        transition: all 0.3s linear;
        cursor: pointer;
      }
    }
  }

  .more-operation {
    // border-top: 1px solid;
    display: flex;
    justify-content: space-around;

    span {
      display: block;
      height: 30px;
      line-height: 30px;
      flex: 1;
      text-align: center;
      cursor: pointer;
      color: white;
      background-color: #858282;
    }

    span:nth-child(2) {
      background-color: #58b19f;
    }

    span:nth-child(3) {
      background-color: #596275;
    }

    span:nth-child(4) {
      background-color: #e24b4b;
    }
  }
}

#taskDone {
  .center {
    .time {
      span {
        color: grey;;
      }
    }
    .content {
      text-decoration: line-through;
      font-size: 0.9em;
      color: rgba(0, 0, 0, 0.6);
      font-style: italic;
    }
    .tags {
      color: grey;
      font-style: italic;
      text-decoration: line-through;
    }
  }
}
</style>