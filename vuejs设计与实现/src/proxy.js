//存储副作用的桶
const bucket = new WeakMap();

//原始值
const data = {
  text: "hello world",
};
//用一个全局变量存储被注册的副作用函数
let activeEffect;

const effect = (fn) => {
  activeEffect = fn;
  fn();
};

//对原始数据代理
const obj = new Proxy(data, {
  get(target, key) {
    console.log("触发了代理的get", target);

    track(target, key);

    return target[key];
  },
  set(target, key, value) {
    console.log("触发了代理的set");
    //设置属性值
    target[key] = value;

    // 把副作用函数从桶里取出并执行
    trigger(target, key);
  },
});

effect(() => {
  document.body.innerText = obj.text;
});

setTimeout(() => {
  // obj.text = "hello vue3";

  obj.notExist = "hello vue3";
}, 1000);

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  // 没有 activeEffect，直接 return
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
}
