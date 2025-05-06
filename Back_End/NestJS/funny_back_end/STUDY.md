# NestJS

## cli的CURD生成器 nest g resource

## 使用cli创建服务器 nest g service [name]

## 使用CLI 创建模块，只需执行$ nest g module [name]

## TypeScript 的语法糖：在构造函数参数中使用 private catsService: CatsService，它等价于下面这两步操作：

```ts
//语法糖 constructor(private catsService: CatsService) {}
```

```ts
export class CatsController {
  private catsService: CatsService; // 第一步：声明属性

  constructor(catsService: CatsService) { // 第二步：构造函数接收参数
    this.catsService = catsService;       // 第三步：赋值给属性
  }

  // 现在就可以在类中使用 this.catsService 了
}
```
