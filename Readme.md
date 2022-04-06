# Property Binding
* The brackets, [ ], cause Angular to evaluate the right-hand side of the assignment as a dynamic expression. Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.
* Example:
To bind the src property of an `<img>` element to a component's property, place the target, src, in square brackets followed by an equal sign and then the property. The property here is itemImageUrl.
```ts
<img alt="item" [src]="itemImageUrl">
```

# Property binding and interpolation
* Use either form when rendering data values as strings, though interpolation is preferable for readability. However, when setting an element property to a non-string data value, you must use property binding.
```ts
<p><img alt="Interpolated item" src="{{itemImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img alt="Property Bound item" [src]="itemImageUrl"> is the <i>property bound</i> image.<p>

<p><span>"{{interpolationTitle}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="propertyTitle"></span>" is the <i>property bound</i> title.</p>
```

# Property binding best practices
1. use only properties and methods that return values.
2. Return the proper type: 
A template expression should evaluate to the type of value that the target property expects. For example, return a string if the target property expects a string, a number if it expects a number, or an object if it expects an object.

# Passing data from parent to child components
1. Prepare Child.ts for external Input
```ts
// Child.ts

export class Child implements OnInit {
  @Input() expectedProp: { title: string };
  constructor() {}

  ngOnInit(): void {}
}

```
2. Bind Property in Parent.html
```ts
// Parent.ts

export class AppComponent {

  book = { title: 'Principles' }

}

// Parent.html 

<ul>
  <child 
    [expectedProp] = "book"
    >
  </child>
</ul>
```
3. Use Property in Child.html
```ts
// Child.html

<li>
  {{expectedProp.title}} 
</li>
```
# Passing data from child to parent component
1. Prepare Child component to emit data
```ts
// Child.ts

...

export class InputBookComponent implements OnInit {
  @Output() bookTitleCreated = new EventEmitter<{ title: string }>();
  bookTitle: string;
  ...

  onAddTitle() {
    this.bookTitleCreated.emit({ title: this.bookTitle });
  }
}

// Child.html
* ngModule is used for 2 way binding. Two-way binding gives components in your application a way to share data. Use two-way binding to listen for events and update values simultaneously between parent and child components.
<div>
  <input type="text" placeholder="Write a title" [(ngModel)]="bookTitle">
  <button (click)="onAddTitle()">Add Title</button>
</div>
```
2. Bind Property in Parent Component template
```ts
// Parent.html

...

<child-selector (bookTitleCreated)=onBookAdded($event)></child-selector>
```
3. Use Property in Parent Component class
```ts
// Parent.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BindingUp';
  favBooks = [
    { title: 'Principles' },
    { title: 'The Story of Success' },
    { title: 'Extreme Economies' },
  ];

  onBookAdded(eventData: { title: string }) {
    this.favBooks = this.favBooks.concat({
      title: eventData.title,
    });
  }
}
```