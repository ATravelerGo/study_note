import {h, ref, render, type VNode} from 'vue'

import MyDialog from './MyDialog.vue'


export const $Dialog = (title: string, content: string, cancelText: string, confirmText: string) => {


    return new Promise((resolve, reject) => {


        const cancelHandler = () => {
            render(null, document.body)
            reject(new Error("Cancel dialog"))

        }

        const confirmHandler = () => {
            resolve("Confirm")
        }


        const close = () => {
        }


        const vnode: VNode = h(MyDialog, {
            title,
            content,
            cancelText,
            confirmText,
            cancelHandler,
            confirmHandler,
            close,
        })

        render(vnode, document.body)

    })

}
