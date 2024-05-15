import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from './cep.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private cepService: CepService) {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      rua: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }

  buscarCep() {
    const cep = this.form.get('cep')?.value;
    if (cep) {
      this.cepService.buscarCep(cep).subscribe((endereco: any) => {
        this.form.patchValue({
          rua: endereco.logradouro,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.localidade,
          estado: endereco.uf
        });
      });
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}