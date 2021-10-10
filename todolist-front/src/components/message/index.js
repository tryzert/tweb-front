import { h, render, reactive } from 'vue';
import Message from './Message.vue';


let messageBox = document.getElementById('message-box');
let duration = 2000;

const init = () => {
    if (!messageBox) {
        messageBox = document.createElement('div')
        messageBox.id = 'message-box';
        document.body.appendChild(messageBox)
    }
}

export const state = reactive({
    id: 0,
    messageList: []
})


export const message = {
    success: (args) => {
        init();
        render(h(Message), messageBox)
        state.messageList.push({
            "id": state.id,
            "type": "success",
            "text": args.text
        })
        let index = state.messageList.findIndex(e => {
            return e.id = state.id;
        })
        if (args.duration) {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, args.duration)
        } else {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, duration)
        }
        state.id++;
    },

    info: (args) => {
        init()
        render(h(Message), messageBox)
        state.messageList.push({
            "id": state.id,
            "type": "info",
            "text": args.text
        })
        let index = state.messageList.findIndex(e => {
            return e.id = state.id;
        })
        if (args.duration) {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, args.duration)
        } else {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, duration)
        }
        state.id++;
    },

    error: (args) => {
        init()
        render(h(Message), messageBox)
        state.messageList.push({
            "id": state.id,
            "type": "error",
            "text": args.text
        })
        let index = state.messageList.findIndex(e => {
            return e.id = state.id;
        })
        if (args.duration) {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, args.duration)
        } else {
            setTimeout(() => {
                // state.messageList.shift();
                state.messageList.splice(index, 1);
            }, duration)
        }
        state.id++;
    }
}