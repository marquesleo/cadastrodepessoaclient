import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../_interfaces/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-pessoa-details',
  templateUrl: './pessoa-details.component.html',
  styleUrls: ['./pessoa-details.component.css']
})
export class PessoaDetailsComponent implements OnInit {
  public pessoa: Pessoa;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getPessoaDetails()
  }

  getPessoaDetails(){
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/pessoa/${id}`;
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.pessoa = res as Pessoa;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

}