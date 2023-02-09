{"Lat":41.03369,
"Lon":-80.65524,
"Name":"Youngstown OH-Sunoco"}

this.http.get('assets/mapsdata.json').subscribe((data:any) => {
  data.forEach((e: any) => {
    const locationData = e.data();
    locationData.lat = e.lat;
    locationData.lon = e.lon;
    this.locationsList.push(locationData);
  });
});

  this.marker = new Feature({
      geometry: new Point(fromLonLat([-0.12755, 51.507222]))
    });
    
    this.vectorSource = new VectorSource({
      features: [this.marker]
    });
    
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });

    XYZ
    
    
    this.tileLayer = new TileLayer({
      source: new OSM(),
      
    });

    // View and map
    this.view = new View({
      center: fromLonLat([0, 0]),
      zoom: 10
    });
    
    this.map = new Map({
      target: 'ol-map',
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view
    });
    const map = new Map({
          view: new View({
            center: [0, 0],
            zoom: 1,
            multiWorld: true,
          }),
          layers: [
            this.tileLayer,
    
            new VectorLayer({
              source:this.vectorSource
            })
          ],
          target: 'ol-map'
        });
    const style =new Style({
              image:new Icon({
                color:'#8959A8',
                crossOrigin:'anonymous',
                src:"/src/assets/map-marker.png",
                imgSize:[20,20]
              })
            })
    this.marker.setStyle(style);
  }

    console.log(this.locationsList)
    
    const source = new VectorSource({
      wrapX: false,
    });
    
    const tileLayer=new TileLayer({
      source: new OSM(),
    })
    
    const map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
        multiWorld: true,
      }),
      layers: [
        tileLayer,

        new VectorLayer({
          source:source
        })
      ],
      target: 'ol-map'
    });
    
    const addRandomFeature = () => {
      this.locationsList.forEach((location: { Lon: any; Lat: any; }) => {
        const x = location.Lon;
        const y = location.Lat;
        const geom = new Point(fromLonLat([x, y]));
        const feature = new Feature(geom);
        source.addFeature(feature);
      });
    }
    
    const duration = 3000;
    function flash(feature:any) {
      const start = Date.now();
      const flashGeom = feature.getGeometry().clone();
      const listenerKey = tileLayer.on('postrender', animate);
    
      function animate(event:any) {
        const frameState = event.frameState;
        const elapsed = frameState.time - start;
        if (elapsed >= duration) {
          unByKey(listenerKey);
          return;
        }
        const vectorContext = getVectorContext(event);
        const elapsedRatio = elapsed / duration;
        // radius will be 5 at start and 30 at end.
        const radius = easeOut(elapsedRatio) * 15 + 2;
        const opacity = easeOut(1 - elapsedRatio);
    
        const style = new Style({
          image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, ' + opacity + ')',
              width: 0.25 + opacity,
            }),
          }),
        });
        
        const style =new Style({
          image:new Icon({
            color:'#8959A8',
            crossOrigin:'anonymous',
            src:"https://res.cloudinary.com/dg3ksfbz0/image/upload/v1675773517/map-marker_bnq3yx.png",
            imgSize:[20,20]
          })
        })
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        // tell OpenLayers to continue postrender animation
        map.render();
      }
    }
    
    source.on('addfeature', function (e: { feature: any; }) {
      flash(e.feature);
    });
    
    window.setInterval(addRandomFeature, 1000);
  }

  const source = new VectorSource({
    wrapX: false
  });
  
  const vectorLayer = new VectorLayer({
    source: source
  });
  
  const marker = new Feature({
    geometry: new Point(fromLonLat([-0.12755, 51.507222]))
  });
  
  const markerStyle = new Style({
    image: new Icon({
      src:'/src/assets/map-marker.png',
      imgSize: [40, 40],
      color: 'red',
      crossOrigin: 'anonymous'
    })
  });
  
  
  const map = new Map({
    target: 'ol-map',
    layers: [
      tileLayer,
      vectorLayer
    ],
    view: new View({
      center: [0, 0],
      zoom: 1,
      multiWorld: true
    })
  });
  map.render();
  marker.setStyle(markerStyle);
  source.addFeature(marker);

  
}






var sites new OpenLayers.Layer.Markers( 'Sites' );
map.addLayer( sites );
addSiteMarkers( sites );

function addMarker( layer, lat, lng, img ) {
  var size   = new OpenLayers.Size( 32, 37 );
  var offset = new OpenLayers.Pixel( -(size.w/2), -size.h );
  var icon   = new OpenLayers.Icon( 'img/marker/' + img, size, offset );
  var marker = new OpenLayers.Marker( getLocation( lat, lng ), icon );

  layer.addMarker( marker );

  marker.events.register( 'click', layer, clickMarker );
}

function clickMarker() {
  alert( 'click' );

  // Pop-up code will go here...
}

function addSiteMarkers( sites ) {
  addMarker( sites, -113.3017895, 49.1939798, 'store.png' );
  addMarker( sites, -113.3072538, 49.2013626, 'building.png' );
}

map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());

    //var results = new OpenLayers.Layer.Text("My Points", { location:"./checkIns_0_view.txt", projection: map.displayProjection});
    //map.addLayer(results);

    var query = new OpenLayers.LonLat(-122.2928337167, 37.5549570333).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    var size = new OpenLayers.Size(21,25);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('http://openlayers.org/dev/img/marker-blue.png', size, offset);
    marker = new OpenLayers.Marker(query, icon);
    markers.addMarker(marker);


    map;

  
++++++++++++++++++++++++++++++++++++++++++++++++++++

  geojsonData = {
    features: [
      {
        type: 'Feature',
        properties: { name: '18th', agency: 'CTA', line: 'Pink Line' },
        geometry: { type: 'Point', coordinates: [-87.669144, 41.857849] },
      },


  
  ngOnInit(): void {

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.initilizeMap();
  

    this.addVectorDataLayer(this.geojsonData);

  }
_______________________________________________________
  initilizeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 7,
      }),
    });
  }
_________________________________________________
  addVectorDataLayer(geojson) {
    const image = new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgb(4, 11, 70)',
      }),
      stroke: new Stroke({ color: '#FF9C32', width: 2 }),
    });

    const styles = {
      Point: new Style({
        image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };
    const styleFunction = (feature) => {
      return styles[feature.getGeometry().getType()];
    };
    const vectorSource = new VectorSource({
      features: [],
    });
    vectorSource.clear();
    vectorSource.addFeatures(new GeoJSON().readFeatures(geojson));
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });
    if (this.map.getLayers().getLength() === 2) {
      this.map.getLayers().getArray().pop();
    }
    this.map.addLayer(vectorLayer);
    this.map.getView().fit(vectorSource.getExtent());
  }
}

this.locations = new Feature({
  geometry: (function() {
    let spreading = [];
    this.locationsList.forEach((location) => {
      const x = location.Lon;
      const y = location.Lat;
      const geometry = new Point(fromLonLat([x, y]));
      spreading.push(geometry);
    });
    return spreading;
  }).call(this)
});

const spreading: Point[] = this.locationsList.map((location:{Lon: any; Lat: any;}) => {
  const x = location.Lon;
  const y = location.Lat;
  return new Point(fromLonLat([x, y]));
});


this.vectorSource = new VectorSource({
  features: (() => {
    let features: Feature[] = [];
    this.locationsList.forEach((location) => {
      const x = location.Lon;
      const y = location.Lat;
      const geometry = new Point(fromLonLat([x, y]));
      const feature = new Feature({
        geometry: geometry
      });
      feature.setStyle(
        new Style({
          image: new Icon(({
            color: 'rgba(255, 0, 0, .5)',
            crossOrigin: 'anonymous',
            src: 'assets/—Pngtree—3d pin map marker location_8990297.png',
            scale: 0.002,
          }))
        })
      );
      features.push(feature);
    });
    return features;
  }).call(this)
});