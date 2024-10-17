///这个是暴力加载

// let ul = document.getElementById("container");
// const total = 100000;
// let now = Date.now();
// for (let i = 0; i < total; i++) {
//   let li = document.createElement("li");
//   li.innerHTML = ~~(Math.random() * total);
//   ul.appendChild(li);
// }
// console.log("JS运行耗时", Date.now() - now);
// setTimeout(() => {
//   console.log("页面加载总时长:", Date.now() - now);
// });

/// 通过定时器 一次性只加载一点点
// const total = 100000;
// const once = 20; //规定一次只能加载20条数据
// let ul = document.getElementById("container");
//
// const loop = (curTotal) => {
//   if (total === 0) {
//     return;
//   }
//   let pageCount = Math.min(curTotal, once);
//   setTimeout(() => {
//     for (let i = 0; i < pageCount; i++) {
//       let li = document.createElement("li");
//       li.innerHTML = ~~(Math.random() * total);
//       ul.appendChild(li);
//     }
//     loop(curTotal - pageCount);
//   }, 0);
// };
//
// loop(total);

/// 通过时间分片(requestAnimationFrame + fragment)

const total = 100000;
const once = 20;
let ul = document.getElementById("container");
const loop = (curTotal) => {
  if (curTotal === 0) {
    return;
  }

  const needRenderCount = Math.min(curTotal, once);

  requestAnimationFrame(() => {
    let fragment = document.createDocumentFragment(); // 创建一个虚拟文档碎片
    for (let i = 0; i < needRenderCount; i++) {
      let li = document.createElement("li");
      li.innerHTML = ~~(Math.random() * total);
      fragment.appendChild(li); // 挂到fragment上
    }
    ul.appendChild(fragment); // 现在才回流
    loop(curTotal - needRenderCount);
  });
};
loop(total);
