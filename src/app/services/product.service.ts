import { Injectable } from '@angular/core';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  getProduct(index: number) {
    return this.products[index];
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  // folio: string;
  //   servicio: string;
  //   serieInicial: string;
  //   serieFinal: string;
  //   cantidad: number;
  //   estado: boolean;
  searchProducts(word: string) {
    let filteredArray = this.products.filter((product) => { 
      return product.servicio.includes(word) ||
      product.serieInicial.includes(word) ||
      product.serieFinal.includes(word);
    });

    return filteredArray;
  }

  addProduct(newProduct: Product) {
    this.products.push(newProduct);
  }

  editProduct(index: number, editedProduct: Product) {
    this.products[index] = editedProduct;
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }
}
