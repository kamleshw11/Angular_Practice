import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../products";
// To set up ProductAlertsComponent to receive product data, first import Input from @angular/core.
// To set up ProductAlertsComponent to emit product data, first import Output and EventEmitter from @angular/core.
@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  // The @Input() decorator indicates that the property value passes in from the component's parent, ProductListComponent.
  @Input() product!: Product;

  // define a property named notify with an @Output() decorator and an instance of EventEmitter(). Configuring ProductAlertsComponent with an @Output() allows the ProductAlertsComponent to emit an event when the value of the notify property changes.
  @Output() notify = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}
