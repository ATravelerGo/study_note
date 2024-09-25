const map = new Map();
const weakMap = new WeakMap();

(function () {
  const foo = { foo: 1 };

  const bar = { bar: 2 };

  map.set(foo, 1);
  weakMap.set(bar, 2);
})();
console.log(
  "map",
  map.keys().forEach((item) => {
    console.log("item", item.foo);
  }),
);
console.log("weakMap", weakMap);

console.log("map", map.get("foo"));
console.log("weakMap", weakMap.get("bar"));
