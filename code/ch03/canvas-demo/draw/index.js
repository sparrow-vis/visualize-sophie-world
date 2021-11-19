// 获得 canvas 容器元素
const canvas = document.getElementById("canvas");

// 设置 canvas 的样式宽高
// 样式宽高决定了 canvas 在画布上呈现的大小
canvas.style.width = 400 + "px";
canvas.style.height = 200 + "px";

// 设置 canvas 画布宽高
// 这个宽高是可以绘制区域的大小
// 样式宽高是默认等于画布宽高的
canvas.width = 400;
canvas.height = 200;

// 获得绘制的上下文
// 之后的 API 都是通过调用 context
const context = canvas.getContext("2d");

// 绘制一个矩形
context.fillStyle = "red"; // 设置填充颜色
context.strokeStyle = "yellow"; // 设置边框的颜色
context.lineWidth = 10; // 设置边框的宽度
context.strokeRect(0, 0, 100, 100); // 绘制边框
context.fillRect(5, 5, 95, 95); // 绘制填充颜色

// 绘制一段文字
context.fillStyle = "black"; // 设置文字的颜色
context.font = "25px PingFangSC-Regular, sans-serif"; // 设置文字的大小和字体
context.fillText("hello world", 150, 100); // 绘制文字
