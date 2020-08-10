import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {


  crudForm: any;

  @Input() product: Product;
  @Output() productEvent = new EventEmitter<any>();
  @Output() productEdited = new EventEmitter<any>();
  @Output() productDeleted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.crudForm = this.formBuilder.group(
      {
        folio: ['', Validators.required],
        servicio: ['', Validators.required],
        serieInicial: ['', Validators.required],
        serieFinal: ['', Validators.required],
        cantidad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        estado: false
      }
    );

  }
  ngOnChanges(changes: SimpleChanges): void {

    let formInput = this.crudForm.controls;

    formInput.folio.setValue(this.product ? this.product.folio : null);
    formInput.servicio.setValue(this.product ? this.product.servicio : null);
    formInput.serieInicial.setValue(this.product ? this.product.serieInicial : null);
    formInput.serieFinal.setValue(this.product ? this.product.serieFinal : null);
    formInput.cantidad.setValue(this.product ? this.product.cantidad : null);
    formInput.estado.setValue(this.product ? this.product.estado : false);

  }
  ngOnInit() {
  }

  sendNewProduct(data) {
    this.productEvent.emit(data);
  }

  sendEditedProduct(data) {
    this.productEdited.emit(data);
  }

  sendDeletedProduct(data) {
    this.productDeleted.emit(data);
  }
}
