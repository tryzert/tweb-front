<template>
  <div class="reminder-box">
    <span class="hide-self" @click="hide">我知道啦</span>
    <div class="title">查看提醒</div>
    <div class="content">
      <div class="item">
        <span class="text">今天</span>
        <span class="num">{{ remindNums.today }}</span>
      </div>
      <div class="item">
        <div>
          <span class="text">本月</span>
          <span class="num">{{ remindNums.thisMonth }}</span>
        </div>
        <div>
          <span class="text">一个月内</span>
          <span class="num">{{ remindNums.inAMonth }}</span>
        </div>
      </div>
      <div class="item">
        <div>
          <span class="text">今年</span>
          <span class="num">{{ remindNums.thisYear }}</span>
        </div>
        <div>
          <span class="text">一年内</span>
          <span class="num">{{ remindNums.inAYear }}</span>
        </div>
      </div>

      <div class="item">
        <div>
          <span class="text">本周</span>
          <span class="num">{{ remindNums.thisWeek }}</span>
        </div>
        <div>
          <span class="text">一周内</span>
          <span class="num">{{ remindNums.inAWeek }}</span>
        </div>
      </div>
      <div class="item">
        <span class="text">三个月内</span>
        <span class="num">{{ remindNums.inThreeMonth }}</span>
      </div>
      <div class="item">
        <span class="text">半年内</span>
        <span class="num">{{ remindNums.inHalfAYear }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['emit-hide-reminder']);
const props = defineProps(['remindNums']);
const hide = () => {
  emits('emit-hide-reminder');
}

</script>

<style lang="less" scoped>
.reminder-box {
  position: fixed;
  padding: 5px;
  width: 200px;
  height: 250px;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: #fff3cd;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  z-index: 10;

  .hide-self {
    position: absolute;
    right: 10px;
    bottom: 7px;
    padding: 3px;
    font-size: 0.8em;
    font-weight: bold;
    color: #856404;
    border: 1px solid #856404;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
  }

  .title {
    height: 35px;
    line-height: 35px;
    font-size: 1.2em;
    text-align: center;
    text-decoration: underline;
    color: #57606f;
  }

  .content {
    height: 200px;
    -moz-column-count: 2; /* Firefox */
    -webkit-column-count: 2; /* Safari 和 Chrome */
    column-count: 2;
    -moz-column-gap: 5px;
    -webkit-column-gap: 5px;
    column-gap: 5px;

    .item {
      width: 100%;
      margin-bottom: 5px;
      break-inside: avoid;
      border-radius: 5px;
      color: #fff;

      .num {
        font-size: 1.3em;
      }
    }

    .item:nth-child(1),
    .item:nth-child(5),
    .item:nth-child(6) {
      text-align: center;
      // background-color: #ff7f50;
      background-color: #ec5561;

      span {
        display: block;
      }

      .num {
        font-weight: bold;
      }
    }

    .item:nth-child(2),
    .item:nth-child(3),
    .item:nth-child(4) {
      background-color: #4c83e9;

      div {
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          display: inline-block;
          height: 100%;
          line-height: 32px;
        }

        .num {
          margin-left: 5px;
        }
      }
    }

    .item:nth-child(3) {
      background-color: #29c46a;
    }

    .item:nth-child(4) {
      background-color: #8c7ae6;
    }

    .item:nth-child(5) {
      background-color: #e1b12c;
    }

    .item:nth-child(6) {
      background-color: #7d848f;
    }
  }
}
</style>