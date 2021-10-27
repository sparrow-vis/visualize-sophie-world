import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.js";
import "https://gw.alipayobjects.com/os/lib/antv/l7/2.5.38/dist/l7.js";

const { Scene, Mapbox, PointLayer, PolygonLayer } = window.L7;

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

export function geoMap(container, size, data) {
  const { countrys, philosophers } = data;
  // 1. 创建场景，并创建 Mapbox 作为地图的底图
  const scene = new Scene({
    id: container,
    map: new Mapbox({
      style: "light",
      pitch: 0,
      center: [12.075174042231398, 42.78877076169903],
      zoom: 1,
    }),
  });

  // 2. 生成地理数据
  const geoPhilosophers = joinData(philosophers, countrys);
  const geoPositions = geoPhilosophers.features
    .map(({ properties }) => properties)
    .filter(({ philosopherSum }) => philosopherSum);

  // 3. 创建气泡图层，并将气泡大小映射到数据字段上
  const pointLayer = new PointLayer({
    autoFit: true,
  })
    .source(geoPositions, {
      parser: { type: "json", coordinates: "centroid" },
    })
    .shape("circle")
    .size("philosopherSum", [20, 60])
    .color("#204CCF")
    .style({ opacity: 0.6 });

  // 4. 创建文本标注图层
  const labelLayer = new PointLayer({})
    .source(geoPositions, {
      parser: { type: "json", coordinates: "centroid" },
    })
    .shape("name", "text")
    .size(10)
    .color("#000")
    .style({ opacity: 0.8, fontSize: 10, stroke: "#fff", strokeWidth: 2 });

  // 5. 将图层挂载到场景上
  scene.addLayer(pointLayer);
  scene.addLayer(labelLayer);
}

export function geoChoroplethMap(container, size, data) {
  const { countrys, philosophers } = data;
  const geoPhilosophers = joinData(philosophers, countrys);
  const scene = new Scene({
    id: container,
    map: new Mapbox({
      style: "light",
      pitch: 0,
      center: [12.075174042231398, 42.78877076169903],
      zoom: 1,
    }),
  });

  const polygonLayer = new PolygonLayer({
    autoFit: true,
  })
    .source(geoPhilosophers, {
      parser: { type: "geojson" },
    })
    .shape("fill")
    .color("philosopherSum", [
      "#35E0CC",
      "#31C4DC",
      "#44A2E4",
      "#3976E2",
      "#204CCF",
    ])
    .style({ opacity: 0.8 });

  scene.addLayer(polygonLayer);
}
