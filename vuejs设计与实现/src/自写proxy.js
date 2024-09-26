const bucket = new WeakMap();
const bucketer = (target, key) => {
  let relayMap = bucket.get(target);
  if (!relayMap) {
    return target[key];
  }
  let relayEffects = relayMap.get(key);

  if (!relayEffects) {
    return target[key];
  }

  relayEffects.forEach((effect) => effect());
};

const bucketd = (target, key) => {
  //这里要收集依赖
  let relayMap = bucket.get(target);
  if (!relayMap) {
    bucket.set(target, (relayMap = new Map()));
  }

  let relayEffects = relayMap.get(key);

  if (!relayEffects) {
    relayMap.set(key, (relayEffects = new Set()));
  }

  relayEffects.add(activeEffect);
};

let activeEffect;
const data = {
  text: "hello world",
};
//对这个对象进行代理
const obj = new Proxy(data, {
  set(target, key, newValue) {
    console.log("走到代理的set了");
    target[key] = newValue;

    bucketer(target, key);

    return true;
  },

  get(target, key) {
    console.log("走到代理的get了，这个时候就要收集依赖");
    bucketd(target, key);
    return target[key];
  },
});

const effect = () => {
  activeEffect = effect;
  document.body.innerText = obj.text;
  activeEffect = null;
};

setTimeout(() => {
  obj.text = "hello vue3";
}, 1000);

effect();
