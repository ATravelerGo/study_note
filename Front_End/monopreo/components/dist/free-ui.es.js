import { openBlock as c, createElementBlock as s, renderSlot as a } from "vue";
const _ = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, r] of o)
    e[n] = r;
  return e;
}, d = {
  name: "MyButton"
}, u = { class: "button" };
function p(t, o, e, n, r, f) {
  return c(), s("button", u, [
    a(t.$slots, "default", {}, void 0, !0)
  ]);
}
const i = /* @__PURE__ */ _(d, [["render", p], ["__scopeId", "data-v-7d8aebe3"]]);
export {
  i as MyButton
};
