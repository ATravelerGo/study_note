//假设我们有一个在线食品配送平台。用户可以下订单、跟踪订单和取消订单。
class OrderManager {
    constructor() {
        this.orders=[]
    }

    placeOrder(order,id) {
        this.orders.push(id)
        return `You have successfully ordered ${order} (${id})`;
    }

    trackOrder(id) {
        return `Your order ${id} will arrive in 20 minutes.`
    }

    cancelOrder(id) {
        this.orders = this.orders.filter(order => order.id !== id)
        return `You have canceled your order ${id}`
    }

}
//在OrderManager类中，我们可以访问placeOrder、trackOrder和cancelOrder方法。直接使用这些方法将是完全有效的 JavaScript！
const manager = new OrderManager()
console.log(manager.placeOrder("张辰","123"))
console.log(manager.trackOrder("123"))
console.log(manager.cancelOrder("123"))
