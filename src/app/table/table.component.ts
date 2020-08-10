import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products: Product[]; //sustituir donde se usa por el servicio
  selectedProduct: Product;// = { id: 0, folio: 'folio', servicio: 'servicio', serieInicial: 'serie inicial', serieFinal: 'serie final', cantidad: 233, estado: true };// = { folio: '', servicio: '', serieInicial: '', serieFinal: '', estado: false };

  // message: Product = { id: 0, folio: 'folio', servicio: 'servicio', serieInicial: 'serie inicial', serieFinal: 'serie final', cantidad: 233, estado: true };
  paginationOptions = [
    { value: 5, text: '5 elementos' },
    { value: 10, text: '10 elementos' },
    { value: 15, text: '15 elementos' },
  ]

  selectedPagination = this.paginationOptions[0];
  actualNuberOfElementsInPage: number;
  searchInput: string;
  ngOnInit() {
    this.products = this.getAllProducts();
    //this.setNumberOfElements(this.array);
  }


  receiveNewProduct($event) {
    // console.log($event);
    let newId = this.getAllProducts().length <= 0 ? 1 : this.getAllProducts()[this.getAllProducts().length - 1].id + 1;
    console.log({ id: newId, ...$event });

    this.productService.addProduct({ id: newId, ...$event });
  }

  receiveEditedProduct($event) {
    console.log({...this.selectedProduct, ...$event});
    this.productService.editProduct(this.selectedProduct.id, {...this.selectedProduct, ...$event});
  }

  receiveDeletedProduct($event) {
    this.productService.deleteProduct($event);
  }


  choosePagination({ value: numberOfElements }) {

    console.log(numberOfElements);
    console.log(this.searchInput);

  }

  setNumberOfElements() {
    return this.fillTable().length < this.selectedPagination.value ? this.fillTable().length : this.selectedPagination.value;
  }

  fillTable(): Product[] {
    if (!this.searchInput) {
      //this.setNumberOfElements(this.array);
      // console.log(this.getAllProducts().length);

      return this.getAllProducts();
    } else {
      // this.setNumberOfElements(filteredArray);
      return this.productService.searchProducts(this.searchInput);
    }
  }

  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  getProduct(id: number = -1) {
    this.selectedProduct = this.productService.getProduct(id);
  }

}
