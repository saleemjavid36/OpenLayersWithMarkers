import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  template:'',
  // templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() map: Map | any;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    this.map.setTarget(this.elementRef.nativeElement);
  }
}
