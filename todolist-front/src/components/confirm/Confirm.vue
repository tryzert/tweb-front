<template>
    <div class="confirm">
        <div class="confirm-title">{{ props.props.title }}</div>
        <div class="confirm-content">{{ props.props.content }}</div>
        <div class="confirm-operation">
            <span @click="cancel">取消</span>
            <span @click="confirm">确认</span>
        </div>
    </div>
</template>

<script setup>
import { render } from 'vue'
import { mask } from './index'
const props = defineProps({
    props: Object
})

const closeSelf = () => {
    let _mask;
    if (!mask) {
        _mask = document.getElementById('mask');
    } else {
        _mask = mask;
    }
    _mask.style.visibility = 'hidden';
    render(null, _mask);
}

const cancel = () => {
    closeSelf();
    props.props.reject('cancel按下了');
}

const confirm = () => {
    closeSelf()
    props.props.resolve('confirm按下了');
}

</script>

<style lang="less">
#mask {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
}

.confirm {
    width: 260px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .confirm-title {
        padding-top: 5px;
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        color: #079992;
    }

    .confirm-content {
        flex: 1;
        padding: 5px 10px;
        font-style: italic;
    }

    .confirm-operation {
        height: 36px;

        span {
            display: inline-block;
            height: 100%;
            width: 50%;
            text-align: center;
            line-height: 36px;
            color: #fff;
            cursor: pointer;
        }

        span:nth-child(1) {
            background-color: grey;
        }

        span:nth-child(2) {
            background-color: #ff3838;
        }
    }
}
</style>