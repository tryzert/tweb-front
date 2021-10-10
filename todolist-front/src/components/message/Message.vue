<template>
  <transition-group name="t-m-list" tag="div">
    <div class="message-item" v-for="item in state.messageList" :key="item" :id="item.type">
      <span v-show="item.type == 'success'">✓</span>
      <span v-show="item.type == 'error'">✗</span>
      <span v-show="item.type == 'info'">？</span>
      {{ item.text }}
    </div>
  </transition-group>
</template>

<script setup>
import { state } from './index'
</script>

<style lang="less">
#message-box {
  width: 300px;
  position: fixed;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  z-index: 10;
}

.message-item {
  margin-bottom: 10px;
  width: 100%;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s linear;
  overflow: hidden;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.5);
}

#success {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}

#error {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
}

#info {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}

// 动画效果
.t-m-list-enter-active,
.t-m-list-leave-active {
  transition: all .35s linear;
}
.t-m-list-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.t-m-list-leave-to {
  opacity: 0;
  height: 0;
  transform: scale(0);
}
</style>