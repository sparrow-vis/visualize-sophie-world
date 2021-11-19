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

// 直接使用 document.createElement 是不行的
function createSVGElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}

const svg = document.getElementById("container-svg");
// 设置 svg 的坐标原点和大小
svg.setAttribute("width", containerWidth);
svg.setAttribute("height", containerHeight);
svg.setAttribute("viewBox", [0, 0, containerWidth, containerHeight]);

// 创建一个 g 元素用于平移
const g = createSVGElement("g");
g.setAttribute("transform", `translate(${margin}, ${margin})`);
svg.appendChild(g);

for (const index of indices) {
  // 取得对应的属性
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

  // 绘制条
  const rect = createSVGElement("rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y - barHeight);
  rect.setAttribute("fill", color);
  rect.setAttribute("width", barWidth);
  rect.setAttribute("height", barHeight);
  g.appendChild(rect);

  // 绘制值
  const text = createSVGElement("text");
  text.textContent = value;
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "white");
  text.setAttribute("font-family", "PingFangSC-Regular, sans-serif");
  text.setAttribute("font-size", 25);
  text.setAttribute("alignment-baseline", "middle");
  text.setAttribute("x", x + barWidth / 2);
  text.setAttribute("y", y - barHeight / 2);
  g.appendChild(text);
}
