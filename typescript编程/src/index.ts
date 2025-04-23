type Executor = {
  (resolve: Function, reject: Function): void;
};

class MPromise {
  constructor(f: Executor) {}
}
const mp = new MPromise((resolve: Function, reject: Function): void => {});

const temp = ["1", 2, 3, 5];

type demo1 = typeof temp;

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type First<T> = T extends infer U ? U : never;

type AttrType<T> = T extends { name: infer M; age: infer M } ? M : never;

type HD = { name: string; age: number };
type valueType = AttrType<HD>; // string | number
