https://github.com/febobo/web-interview/issues/9

> 根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染情况

组件实例对象data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象