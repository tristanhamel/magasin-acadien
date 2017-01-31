import { Component } from '@angular/core';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
import { FileItem } from 'ng2-cloudinary/node_modules/ng2-file-upload/file-upload/file-item.class';

import {Product } from '../../models';
import { ProductsService } from '../../services/products.service';

import './new-product.scss';

@Component ({
  selector: 'new-product',
  template: require('./new-product.html')
})

export class NewProduct {
  model: Product = new Product;
  showForms: boolean = true;
  productId: string = '';

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dja72kakj', uploadPreset: 'hka9egjo'})
  );

  constructor(private productsService: ProductsService) {
    // Override onSuccessItem to retrieve the imageId
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);

      // save file reference
      this.model.images.push(res.public_id);

      // clear queue
      this.uploader.queue.forEach( file => {
        this.removeFromQueue(file);
      });

      return { item, response, status, headers };
    };
  }

  // send file data to cloudinary and handle returned image objects
  uploadImages() {
    console.log(this.uploader);
    this.uploader.uploadAll();
  }

  onSubmit() {
    const dummy: Product = {
      _id: null,
      bids: [],
      created: new Date(),
      currentPrice: 0,
      deadline: new Date('July 13, 2017 11:13:00'),
      description: 'sdcdscscsdcs',
      images: ['dgilyzcnjcnsl6vq5ah6'],
      name: 'wdwdwdwdw',
      owner: null,
      startPrice: 1.1,
      updated: new Date()
    };

    // this.productsService.newProduct(this.model)
    this.productsService.newProduct(dummy)
      .subscribe( response => {
        console.log(response);
        this.reset();
        this.showForms = false;
        this.productId = response.json().product._id;
      },
      error => console.log(error));
  }

  reset(): void {
   this.model = new Product;
  }

  removeFromQueue(file: FileItem): void {
   this.uploader.removeFromQueue(file);
  }

  restart(): void {
    this.showForms = true;
  }
}
