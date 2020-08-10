import { Injectable } from '@angular/core';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, folio: '1', servicio: '1', serieInicial: '1', serieFinal: '1', cantidad: 20, estado: false },
    { id: 2, folio: '2', servicio: '2', serieInicial: '2', serieFinal: '2', cantidad: 30, estado: true },
    { id: 3, folio: '3', servicio: '3', serieInicial: '3', serieFinal: '3', cantidad: 24, estado: false },
    { id: 4, folio: '4', servicio: '4', serieInicial: '4', serieFinal: '4', cantidad: 242, estado: true },
    { id: 5, folio: '4', servicio: '4', serieInicial: '4', serieFinal: '4', cantidad: 24, estado: true },
    { id: 6, folio: '4', servicio: '4', serieInicial: '4', serieFinal: '4', cantidad: 22, estado: false },

  ];

  getProduct(id: number): Product {
    return this.products.find((product) => { return product.id == id });
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
  searchProducts(word: string): Product[] {
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

  editProduct(id: number, editedProduct: Product) {
    let productIndex = this.findProductIndex(id);
    this.products[productIndex] = editedProduct;
  }

  deleteProduct(id: number) {
    let productIndex = this.findProductIndex(id);
    this.products.splice(productIndex, 1);
  }

  private findProductIndex(id: number): number {
    let allProducts = this.getAllProducts();
    return allProducts.findIndex((product) => { return product.id == id });
  }
}
