const data = {
  name: "张辰",
  age: 12,
  test: function () {
    console.log(123);
  },

  address: {
    province: "河北省",
    city: "保定",
  },
};
console.log("data", data);
/*
 * @Description: 方案一 使用JSON  null可以拷贝过去   undefined,Symbol(),函数无法拷贝过去，不支持循环引用
 * @Author: zhangChen
 * @Date: 2025-04-22 18:21:33
 * @LastEditTime: 2025-04-22 18:21:33
 */

// const copy1 = JSON.parse(JSON.stringify(data));
// copy1.name = "张";
// console.log("copy1", copy1);

/*
 * @Description: 方案二 使用递归完成深拷贝
 * @Author: zhangChen
 * @Date: 2025-04-22 18:26:45
 * @LastEditTime: 2025-04-22 18:26:45
 */
