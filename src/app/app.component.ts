import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closeAgregarModal', ) private agregarModal: ElementRef;
  @ViewChild('closeEliminarModal', ) private eliminarModal: ElementRef;
  title = 'basic-crud';
  
  array:any = [];
  crudForm: any;
  selectedElement: number;
 

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

  onSubmit(datos) {

    console.log(this.array.push(datos));
    console.log(this.array);
    this.agregarModal.nativeElement.click();
    this.crudForm.reset();
  }

  selectElement(index: number) {
    this.selectedElement = index;
  }

  deleteElement() {
    this.eliminarModal.nativeElement.click();
    this.array.splice(this.selectedElement, 1);
  }

  editElement() {

  }

  searchElement() {

  }
}
