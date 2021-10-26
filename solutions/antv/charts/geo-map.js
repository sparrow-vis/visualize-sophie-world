import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.js";
import "https://gw.alipayobjects.com/os/lib/antv/l7/2.5.38/dist/l7.js";

const { Scene, Mapbox, PolygonLayer } = window.L7;

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
