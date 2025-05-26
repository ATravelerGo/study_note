# 开发移动端H5的时候遇到的问题
1. 当我在用 px to viewPoint的时候 发现 我给定的高度是100vh，但是当打开移动端软键盘的时候，软键盘会影响vh的高度
我的方案是在页面首次进入的时候获取windows.innherHeight保存下来，然后在css中通过v-bind进行动态绑定，这样就不会因为软键盘的调用影响vh的高度
```
	pageHeight.value = window.innerHeight + 'px';
	
	height: v-bind(pageHeight); //注意 v-bind里面只能写变量 不能写任何公式等！！！！！！！！！！！

```
