import { Component, OnDestroy, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import OSM from 'ol/source/OSM';
import {HttpClient} from '@angular/common/http'

import { Subscription } from 'rxjs';
import locationsData from './mapsData.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{

  map: Map | any
  // locationsList :any[]=[] 

  vectorSource :any;
  vectorLayer :any;
  rasterLayer :any;
  locations: any;
  spreading:any

  private subscriptionValue:Subscription | any 

  
  jsonData:{Lat:number,Lon:number,Name:string}[]=locationsData
  // jsonData: any =[]
  

  constructor(private http:HttpClient){
  
    // this.subscriptionValue=this.http.get('/src/app/mapsData.json').subscribe((data:any)=>{
    //   const obtainedData: any[]=[]
    //     data.map((e:any)=>{
    //       obtainedData.push(e)
    //     })

    //   for(const i of obtainedData ){
    //     this.jsonData.push({
    //       "Lat": i.Lat,
    //       "Lon": i.Lon,
    //     })
        
    //   }   
    // })
  }
  ngOnDestroy(): void {
    this.subscriptionValue.unsubscribe();
  }
  
  
  ngOnInit(): void {
    this.initializeMap()
  }
  

  initializeMap(){
    console.log(this.jsonData)
    let features = [];
    for (const location of this.jsonData) {
      const x = location.Lon;
      const y = location.Lat;
      const geom = new Point(fromLonLat([x, y]));
      const feature = new Feature({
        geometry: geom
      });
      feature.setStyle(
        new Style({
          image: new Icon(({
            color: 'rgba(255, 0, 0, .5)',
            crossOrigin: 'anonymous',
            src: 'assets/—Pngtree—3d pin map marker location_8990297.png',
            scale: 0.005,
          }))
        })
      );
      features.push(feature);
    
   
    }
  
    this.vectorSource = new VectorSource({
      features: features
    });
  
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    });
  
    this.map = new Map({
      target: 'map',
      layers: [ new TileLayer({
        source: new OSM()
      }), this.vectorLayer ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 1
      })
    })
  } 
}
