import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'app/shared/services/repository.service';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from './../../_interfaces/pessoa.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pessoa-update',
  templateUrl: './pessoa-update.component.html',
  styleUrls: ['./pessoa-update.component.css']
})
export class PessoaUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public pessoa: Pessoa;
  public pessoaForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.pessoaForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dataNascimento: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.maxLength(100)]),
      telefone: new FormControl('',[Validators.maxLength(20)]),
      cpf:new FormControl('', [Validators.required, Validators.maxLength(11)]),
      sexo:new FormControl('',[])

    });

    this.getPessoarById();
  }

  private getPessoarById() {
    let pessoaId: string = this.activeRoute.snapshot.params['id'];

    let pessoaByIdUrl: string = `api/pessoa/${pessoaId}`;

    this.repository.getData(pessoaByIdUrl)
      .subscribe(res => {
        this.pessoa = res as Pessoa;
        this.pessoaForm.patchValue(this.pessoa);
        $('#dataNacimento').val(this.datePipe.transform(this.pessoa.dataNascimento, 'MM/dd/yyyy'));
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public validateControl(controlName: string) {
    if (this.pessoaForm.controls[controlName].invalid && this.pessoaForm.controls[controlName].touched)
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

  public redirectToPessoaList() {
    this.router.navigate(['/pessoa/list']);
  }

  public updatePessoa(pessoaFormValue) {
    if (this.pessoaForm.valid) {
      this.executePessoaUpdate(pessoaFormValue);
    }
  }

  private executePessoaUpdate(pessoaFormValue) {

    this.pessoa.nome = pessoaFormValue.nome,
      this.pessoa.dataNascimento = pessoaFormValue.dataNascimento,
      this.pessoa.cpf = pessoaFormValue.cpf,
      this.pessoa.email = pessoaFormValue.email,
      this.pessoa.sexo = pessoaFormValue.sexo,
      this.pessoa.telefone = pessoaFormValue.telefone

    let apiUrl = `api/pessoa/${this.pessoa.id}`;
    this.repository.update(apiUrl, this.pessoa)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

}