const data = [
  { name: "questions", value: 17 },
  { name: "schools", value: 25 },
  { name: "philosophers", value: 35 },
];

const chartWidth = 480; // 条形图的宽度
const chartHeight = 300; // 条形图的高度
const margin = 15; // 条形图的外边距
const containerWidth = chartWidth + margin * 2; // 容器的宽度
const containerHeight = chartHeight + margin * 2; // 容器的高度

const names = Array.from(data, (d) => d.name);
const values = Array.from(data, (d) => d.value);
const indices = Array.from(data, (_, i) => i);

// 计算每一个条左下顶点的横坐标
// 位置和在数组里面的 index 有关
const step = chartWidth / names.length;
const barWidth = step * 0.8;
const xs = Array.from(indices, (i) => i * step);

// 计算每一个条左下顶点的纵坐标
// 因为所有条底部都是对齐的，所以就是图表的高度
const y = chartHeight;

// 获得每一个条的高度
// 条的高度应该和 value 线性相关的
const vmax = Math.max(...values);
const barHeights = Array.from(values, (v) => chartHeight * (v / vmax));

// 获得每一个条的颜色
const nameColor = {
  questions: "#5B8FF9",
  philosophers: "#61DDAA",
  schools: "#65789B",
};
const colors = Array.from(names, (name) => nameColor[name]);

const canvas = document.getElementById("container-canvas");
canvas.style.width = containerWidth + "px";
canvas.style.height = containerHeight + "px";

// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
// 这个地方就不详细展开了，感兴趣的可以自行查阅
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;

const context = canvas.getContext("2d");
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响

context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域

for (const index of indices) {
  // 将需要绘制的属性取出来
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

  // 绘制条
  context.fillStyle = color;
  context.fillRect(x, y - barHeight, barWidth, barHeight);

  // 绘制值
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = "25px PingFangSC-Regular, sans-serif";
  context.fillText(value, x + barWidth / 2, y - barHeight / 2);
}
