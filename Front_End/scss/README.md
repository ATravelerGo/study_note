# Scss
## Scss特点
1. 变量
2. 嵌套
3. 部分文件和导入：@import引入
4. 混合宏（Mixins）：允许定义可复用的样式块，减少代码冗余
5. 继承：支持样式继承，增强样式复用性
6. 运算和函数：支持数学运算和定义函数，增强样式的动态性

## 使用scss
1. npm install  sass
2. npx sass --version 可以查看安装的sass版本
3. 安装完成后，我们需要配置Sass的编译任务，以便将scss文件编译为css文件
4. 创建一个scss文件 和一个css文件夹
    ```scss
    //style.scss
    $primary-color:#333;
    
    body {
      color: $primary-color;
    }
    ```
5. 使用命令编译scss，运行命令将会把scss编译为css文件
   ```
   sass scss/style.scss css/style.css
   ```
6. 这里有个注意点，如果你安装sass的时候不是-g 全局安装，在使用命令的时候需要npx sass 前面加上个npx，这样会调用nodemodule中的命令
   ***npx 允许你直接执行安装在项目依赖中的命令，而不需要全局安装***
7. 命令执行后会发现，生成了style.css文件
8. 但是现在每次scss变化后都需要手动输命令，我们使用--watch参数 可以一直监听一个scss文件的变化，进而同步更新css
   ```
   sass --watch scss/style.scss css/style.css
   ```
   
## Scss的基本语法
1. 变量：允许使用变量来存储css值，如颜色，尺寸，字体等。变量使用$符号定义
   ```scss
   $primary-color:#333;

   body {
    color: $primary-color;
   }
   
   html {
    background-color: $primary-color;
   }
   ```
2. 嵌套规则（这个很简单了就不记录了）
3. 部分文件和导入
   scss允许你将样式拆分为多个文件，然后通过@import语句引入
   我们创建个_variables.scss
   ```scss
   $primary-color: #333;
   $font-stack: Helvetica, sans-serif;
   ```
   > 这里有个注意点，scss文件名称开头带下划线(_)的称作“部分文件”
   > 他们不直接生成css文件，而是被其他scss文件导入（@import或@use @import最常用）
   > 这种文件通常用来存放共享的变量，混合宏（mixins）,函数等代码，以便在其他scss文件中进行复用

   之后在style.scss中导入这个部分文件
   ```scss
   // style.scss
   @import "variables";
   body {
     color: $primary-color;
   }
   
   html {
    background-color: $primary-color;
   }
   ```
   会发现代码运行依旧没有问题
4. 混合宏（mixins）这个自己一直记不牢
   混合宏允许你定义可复用的样式块，并在需要的地方调用，减少代码重复
   ```scss
   //_varibales.scss
   $primary-color: #333;
   $font-stack: Helvetica, sans-serif;
   @mixin border-radius($radius) {
   -webkit-border-radius: $radius;
   -moz-border-radius: $radius;
   border-radius: $radius;
   }
   
   //style.scss
   @import "variables";
   body {
    color: $primary-color;
   }
   
   html {
     background-color: $primary-color;
     @include border-radius(10px)
   }
   ```
   >  @mixin border-radius($radius)   要引入的话需要使用 @include border-radius(10px)

5. 继承 scss允许你通过@extend关键字继承现有的css规则，增强样式复用性
   ```scss
   //style.scss
   .message {
    border: 1px solid red;
    padding: 10px;
    color: #333;
   }
   
   .success {
    @extend .message;
    padding: 20px;
   }
   .error {
    @extend .message;
   }
   ```
6. 运算
   scss支持数学运算，可以在样式中进行加，减，乘，除等操作
   原生css可以通过calc（）来进行运算，但是这个不支持***乘法***
7. 函数（这个也是用得少，***需要看下常用的函数***）***使用函数的时候前面不用加任何前缀！！！！！！！直接使用！！！！！！***
   scss提供了许多内置函数，如颜色函数，字符串函数，列表函数等等
   也可以自定义函数
   ```scss
   //自定义函数
   @function px-to-rem($px, $base-font-size: 16px) {
      @return $px / $base-font-size * 1rem;
   }
   
   .container {
     font-size: px-to-rem(18px);
   }
   ```
   
## Scss的基本语法***进阶***
1. 变量
   变量的作用域
   1. 全局作用域
      ```scss
         $primary-color: #333; //这个就是全局作用域的变量
      body {
         color: $primary-color;
      }
      h1 {
         color: $primary-color;
      }

      ```
   2. 局部变量
      ```scss
      body {
        $secondary-color: #666;
        color: $secondary-color;
      }
      
      h1 {
        // 下面的代码会报错，因为 $secondary-color 只在 body 代码块内有效
        // color: $secondary-color;
      }
      ```
   3. 使用！global声明全局作用域，即使在局部作用域中定义变量，也可以使用!global声明将变量提升为全局变量
      ```scss
         body {
           $secondary-color: #666 !global;
           color: $secondary-color;
         }
         
         h1 {
           color: $secondary-color; // 现在可以访问 $secondary-color
         }
      ```
   4. 可以通过!default关键字来设置默认值
      ```scss
           $primary-color: #333;
           $primary-color: #666 !default; // 如果 $primary-color 已经定义，则保留原值
         
         body {
           color: $primary-color; // 输出 #333
         }
      ```
   5. 变量的动态计算
      ```scss
       $base-font-size: 16px;
       $large-font-size: $base-font-size * 1.5;
      
      body {
       font-size: $base-font-size;
      }
      
      h1 {
       font-size: $large-font-size;
      }
      ```
   6. 颜色变量
      ```scss
      $primary-color: #3498db;
      $secondary-color: lighten($primary-color, 20%);
      $tertiary-color: darken($primary-color, 20%);
      
      body {
        background-color: $primary-color;
        color: $secondary-color;
      }
      
      a {
        color: $tertiary-color;
      }
      ```
2. 嵌套
   1. 嵌套媒体查询(这个很***重要**,***特殊*** ***这里的选择器在媒体查询外面***)
   ```scss
      .container {
      width: 100%;
      
      @media (min-width: 600px) {
      width: 80%;
      }
      
      @media (min-width: 1024px) {
      width: 60%;
      }
      }
   ```
3. 部分文件和导入
   1. 部分文件
      部分文件以“_”开头命名，这样在编译时Sass会忽略这些文件，不会生成对应的css文件
   2. 使用@import语句可以将部分文件导入到主样式文件中。***导入时无需包含_和文件拓展名***

4. 混合宏(mixins)这个地方细节很多，用的时候请看文档
   https://blog.csdn.net/weixin_52938153/article/details/139251892
5. 继承
   @extend + 选择器  来继承一个选择器的样式
   ```scss
   .message {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
   }
   
   .success {
    @extend .message;
    border-color: green;
   }
   
   .error {
    @extend .message;
    border-color: red;
   }
   ```
   
   占位选择器(***这个可以特别注意下*** 算是css代码优化点，只有使用才会生成css代码)
      在scss中，你可以使用占位选择器来定义不会生成实际css的样式块
      占位选择器以%符号开头，只有在被继承时才会生成css代码
   ```scss
   %message {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
   }
   
   .success {
    @extend %message;
    border-color: green;
   }
   
   .error {
    @extend %message;
    border-color: red;
   }

   ```
6. 运算和函数
   https://blog.csdn.net/weixin_52938153/article/details/139251897
7. 编译和调试SCSS
   编译单个文件
   ```
   sass scss/style.scss css/style.css
   ```
   