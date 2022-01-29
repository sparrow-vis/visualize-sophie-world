import "https://gw.alipayobjects.com/os/lib/antv/l7plot/0.0.5/dist/umd/l7plot.min.js";
import countrys from "../data/countrys.js";
import philosophers from "../data/philosophers.js";

const { Area } = window.L7Plot;
const MappingName = { 雅典: "希腊" };

const joinData = (philosophers, geoData) => {
  const philosopherCountryMap = philosophers.reduce(
    (countryMap, philosopher) => {
      const { country } = philosopher;
      const mappingCountry = MappingName[country] || country;
      if (countryMap[mappingCountry]) {
        countryMap[mappingCountry].push(philosopher);
      } else {
        countryMap[mappingCountry] = [philosopher];
      }
      return countryMap;
    },
    {}
  );
  const features = geoData.features.map((feature) => {
    const countryName = feature.properties.name;
    const philosophers = philosopherCountryMap[countryName] || [];
    const philosopherSum = philosophers.length || undefined;
    const currentFeature = Object.assign({}, feature, {
      properties: {
        ...feature.properties,
        philosophers,
        philosopherSum,
      },
    });

    return currentFeature;
  });
  const geoPhilosophers = Object.assign({}, geoData, { features });

  return geoPhilosophers;
};

// 1. 以时间顺序对相同生平区间的哲学家进行分组
const philosopherGroups = philosophers.reduce((groups, philosopher) => {
  if (groups.length === 0) return [[philosopher]];
  const lastGroup = groups[groups.length - 1];
  const lastPhilosopherLifeEndTime =
    lastGroup[lastGroup.length - 1].lifespan[1];
  const currentPhilosopherLifeStartTime = philosopher.lifespan[0];
  if (lastPhilosopherLifeEndTime >= currentPhilosopherLifeStartTime) {
    lastGroup.push(philosopher);
  } else {
    groups.push([philosopher]);
  }
  return groups;
}, []);

// 2. 创建图表
const areaMap = new Area(container, {
  map: {
    type: "mapbox",
    style: "light",
    center: [20.3573729, 40.5221543],
    zoom: 3,
    pitch: 0,
  },
  source: {
    data: { type: "FeatureCollection", features: [] },
    parser: { type: "geojson" },
  },
  autoFit: false,
  color: {
    field: "philosopherSum",
    value: ["#B8E1FF", "#7DAAFF", "#3D76DD", "#0047A5"],
    scale: { type: "quantize" },
  },
  style: {
    opacity: 0.8,
    stroke: "#F2F7F7",
    lineType: "dash",
    lineDash: [1, 10],
    lineWidth: 0.6,
    lineOpacity: 0.8,
  },
  label: {
    field: "name",
    style: { fill: "#000", fontSize: 10, stroke: "#fff", strokeWidth: 2 },
  },
  state: { active: true, select: false },
  tooltip: {
    items: [
      { field: "name" },
      { field: "philosopherSum" },
      {
        field: "philosophers",
        customValue: (value) =>
          value
            .map(
              (item) =>
                `name: ${item.name}, lifespan: ${item.lifespan.join("~")}`
            )
            .join(";"),
      },
    ],
  },
  zoom: { position: "bottomright" },
  legend: { position: "bottomleft" },
});

// 3. 按时间递增顺序渲染更新区域变化图
let currentGroupIndex = 0;
areaMap.on("loaded", () => {
  const geoPhilosophers = joinData(
    philosopherGroups[currentGroupIndex],
    countrys
  );
  const geoJson = {
    features: geoPhilosophers.features.filter(
      (item) => item.properties.philosophers.length
    ),
    type: "FeatureCollection",
  };
  areaMap.changeData(geoJson);
});
areaMap.on("change-data", () => {
  currentGroupIndex =
    currentGroupIndex === philosopherGroups.length - 1
      ? 0
      : ++currentGroupIndex;
  const geoPhilosophers = joinData(
    philosopherGroups[currentGroupIndex],
    countrys
  );
  const geoJson = {
    features: geoPhilosophers.features.filter(
      (item) => item.properties.philosophers.length
    ),
    type: "FeatureCollection",
  };
  setTimeout(() => {
    areaMap.changeData(geoJson);
  }, 1500);
});
