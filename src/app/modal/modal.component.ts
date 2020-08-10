import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  crudForm: any;

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
  ngOnInit() {
  }

}
