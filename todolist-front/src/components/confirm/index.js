import { h, render } from 'vue'
import Confirm from './Confirm.vue'

export let mask = document.getElementById('mask');


const confirm = (args) => {
    if (!mask) {
        mask = document.createElement('div');
        mask.id = 'mask';
        document.body.appendChild(mask);
    }
    mask.style.visibility = 'visible';
    let promise = new Promise((resolve, reject) => {
        render(h(Confirm, {
            props: {
                ...args,
                resolve,
                reject
            }
        }), mask)
    })

    return promise;
}

export default confirm;
