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
      console.log(this.getAllProducts().length);

      return this.getAllProducts();
    } else {
      // this.setNumberOfElements(filteredArray);
      return this.productService.searchProducts(this.searchInput);
    }
  }

  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  editProduct(id: number, product: Product) {
    this.productService.editProduct(id, product);
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

}
