let activeEffect;

function effect(fn) {
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
  };

  effectFn.deps = ["123"];
  effectFn();
}

effect(() => {
  console.log("134");
  console.log("activeEffect", activeEffect);
  console.log("activeEffect", activeEffect.deps);
});
