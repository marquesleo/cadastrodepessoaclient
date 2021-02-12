import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'app/shared/services/repository.service';
import { Pessoa } from './../../_interfaces/pessoa.model';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {
  public pessoas: Pessoa[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllPessoa();
  }

  public getAllPessoa() {
    let apiAddress: string = "api/pessoa";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.pessoas = res as Pessoa[];
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

  public getPessoaDetails(id) {
    let detailsUrl: string = `/pessoa/details/${id}`
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage(id) {
    let updateUrl: string = `/pessoa/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDeletePage(id){
    let deleteUrl: string = `/pessoa/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

}