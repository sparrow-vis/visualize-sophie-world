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

// 1. 生成地理数据
const geoPhilosophers = joinData(philosophers, countrys);
const geoJson = {
  features: geoPhilosophers.features.filter(
    (item) => item.properties.philosophers.length
  ),
  type: "FeatureCollection",
};

// 2. 创建图表
const areaMap = new Area("container", {
  map: {
    type: "mapbox",
    style: "light",
    center: [120.19382669582967, 30.258134],
    zoom: 3,
    pitch: 0,
  },
  source: {
    data: geoJson,
    parser: {
      type: "geojson",
    },
  },
  autoFit: true,
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
    visible: true,
    field: "name",
    style: {
      fill: "#000",
      opacity: 0.8,
      fontSize: 10,
      stroke: "#fff",
      strokeWidth: 2,
      textAllowOverlap: false,
      padding: [5, 5],
    },
  },
  state: { active: true, select: false },
  tooltip: {
    items: ["name", "philosopherSum"],
  },
  zoom: {
    position: "bottomright",
  },
  legend: {
    position: "bottomleft",
  },
});
