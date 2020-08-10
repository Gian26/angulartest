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
  products: Product[];
  selectedProduct: Product;

  paginationOptions = [
    { value: 5, text: '5 elementos' },
    { value: 10, text: '10 elementos' },
    { value: 15, text: '15 elementos' },
  ]

  selectedPagination = this.paginationOptions[0];
  searchInput: string;

  firstEle = 0;
  lastEle = this.setNumberOfElements();
  actualPage = 1;
  //productsPerPage = this.selectedPagination.value;


  ngOnInit() {
  }
  numPages() {
    return Math.ceil(this.getAllProducts().length / this.selectedPagination.value);
  }
  previousPage() {
    if (this.actualPage > 1) {
      this.actualPage--;
      this.changePage(this.actualPage);
    }
  }

  nextPage() {
    if (this.actualPage < this.numPages()) {
      this.actualPage++;
      this.changePage(this.actualPage);
    }
  }


  changePage(page) {
    // Validate page
    if (page < 1) page = 1;
    if (page > this.numPages()) page = this.numPages();

    this.firstEle = (page - 1) * this.selectedPagination.value;
    this.lastEle = (page * this.selectedPagination.value) > this.getAllProducts().length ? this.getAllProducts().length : (page * this.selectedPagination.value);

  }


  receiveNewProduct($event) {
    let newId = this.getAllProducts().length <= 0 ? 1 : this.getAllProducts()[this.getAllProducts().length - 1].id + 1;
    console.log({ id: newId, ...$event });

    this.productService.addProduct({ id: newId, ...$event });
  }

  receiveEditedProduct($event) {
    console.log({ ...this.selectedProduct, ...$event });
    this.productService.editProduct(this.selectedProduct.id, { ...this.selectedProduct, ...$event });
  }

  receiveDeletedProduct($event) {
    this.productService.deleteProduct($event);
  }


  // choosePagination({ value: numberOfElements }) {

  //   this.changePage(this.actualPage);
  //   console.log(numberOfElements);

  // }

  setNumberOfElements() {
    return this.fillTable().length < this.selectedPagination.value ? this.fillTable().length : this.selectedPagination.value;
  }

  fillTable(): Product[] {
    if (!this.searchInput) {
      return this.getAllProducts();
    } else {
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
