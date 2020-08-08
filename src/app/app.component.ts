import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('closeAgregarModal') private agregarModal: ElementRef;
  @ViewChild('closeEliminarModal') private eliminarModal: ElementRef;
  title = 'basic-crud';

  array: any = [];
  filterArray: any = [];
  crudForm: any;
  selectedElement: number = -1;
  inputForm = new FormControl('');

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

  addElement(datos) {

    this.array.push(datos);
    this.agregarModal.nativeElement.click();
    this.crudForm.reset();
  }

  deselect() {
    this.selectedElement = -1;
  }

  selectElement(index: number) {
    this.selectedElement = index;
  }

  deleteElement() {
    this.eliminarModal.nativeElement.click();
    this.array.splice(this.selectedElement, 1);
  }

  setForm(index: number) {
    this.selectElement(index);

    let formInput = this.crudForm.controls;
    let element = this.array[this.selectedElement];

    formInput.folio.setValue(element.folio);
    formInput.servicio.setValue(element.servicio);
    formInput.serieInicial.setValue(element.serieInicial);
    formInput.serieFinal.setValue(element.serieFinal);
    formInput.cantidad.setValue(element.cantidad);
    formInput.estado.setValue(element.estado);

  }

  editElement(datos) {
    this.array[this.selectedElement] = datos;
    this.agregarModal.nativeElement.click();
    this.crudForm.reset();
  }

  searchElement() {
    console.log(this.inputForm.value);
    let containableString = this.inputForm.value
    if (!containableString) return;
    let filtroArray = this.array.filter((element) => { 
      return element.servicio.includes(containableString) ||
      element.serieInicial.includes(containableString) ||
      element.serieFinal.includes(containableString);
    });
    console.log(filtroArray);
    this.filterArray = filtroArray
    // console.log(this.array.forEach(element => {
    //   return 0;
    // }));
  }
}
