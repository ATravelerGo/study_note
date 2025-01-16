import {defineAsyncComponent, h, render, nextTick} from 'vue'
import type {Component} from 'vue'


interface IModalOptions {
    modalComponent: Component
    appendTo?: HTMLElement | string

    [name: string]: any
}

const showModal = (options: IModalOptions) => {

}
