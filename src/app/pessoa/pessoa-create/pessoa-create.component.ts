import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PessoaForCreation } from './../../_interfaces/pessoa-for-creation.model';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { RepositoryService } from '../../shared/services/repository.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.css']
})
export class PessoaCreateComponent implements OnInit {
  public errorMessage: string = '';

  public pessoaForm: FormGroup;

  constructor(private repository: RepositoryService,
               private errorHandler: ErrorHandlerService, 
               private router: Router, 
               private datePipe: DatePipe) { }

  ngOnInit() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dataNascimento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.maxLength(100)]),
      telefone: new FormControl('',[Validators.maxLength(20)]),
      cpf:new FormControl('', [Validators.required, Validators.maxLength(11)]),
      sexo:new FormControl('',[])
    });
  }

  public validateControl(controlName: string) {
    if (this.pessoaForm.controls[controlName].invalid && 
              this.pessoaForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.pessoaForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker(event) {
    this.pessoaForm.patchValue({ 'dataNascimento': event });
  }

  public createPessoa(pessoaFormValue) {
    if (this.pessoaForm.valid) {
      this.executePessoaCreation(pessoaFormValue);
    }
  }

  private executePessoaCreation(pessoaFormValue) {
    let pessoa: PessoaForCreation = {
      nome: pessoaFormValue.nome,
      dataNascimento: this.datePipe.transform(pessoaFormValue.dataNascimento, 'yyyy-MM-dd'),
      cpf: pessoaFormValue.cpf,
      email: pessoaFormValue.email,
      sexo: pessoaFormValue.sexo,
      telefone: pessoaFormValue.telefone
    }

    let apiUrl = 'api/pessoa';
    this.repository.create(apiUrl, pessoa)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToPessoaList(){
    this.router.navigate(['/pessoa/list']);
  }

}