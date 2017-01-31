import {Component, Input} from '@angular/core';

@Component ({
  selector: 'product-image',
  template: '<cl-image [public-id]="imageId" cloud-name="dja72kakj" [width]="width" [height]="height"></cl-image>'
})

export class ProductImage {
  @Input() imageId: string;
  @Input() height: number;
  @Input() width: number;
}
