//模拟渲染器 将vnode渲染成真实DOM
const vnode = {
  tag: "div",
  props: {
    onClick: () => alert("hello"),
  },
  children: "click me",
};

console.log("执行了");

const render = (vnode, container) => {
  const el = document.createElement(vnode.tag);

  //遍历vnode.props 将属性，事件添加到DOM元素上

  for (let key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key]);
    }
  }

  //处理vnode
  if (typeof vnode.children === "string") {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => {
      render(child, el);
    });
  }

  container.appendChild(el);
};

render(vnode, document.body);
