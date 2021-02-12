import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { RepositoryService } from 'app/shared/services/repository.service';
import { Pessoa } from '../../_interfaces/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-pessoa-delete',
  templateUrl: './pessoa-delete.component.html',
  styleUrls: ['./pessoa-delete.component.css']
})
export class PessoaDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public pessoa: Pessoa;
 
constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
  private activeRoute: ActivatedRoute) { }
 
  ngOnInit() {
    this.getOwnerById();
  }
   
  private getOwnerById() {
    let ownerId: string = this.activeRoute.snapshot.params['id'];
    let ownerByIdUrl: string = `api/owner/${ownerId}`;
   
    this.repository.getData(ownerByIdUrl)
      .subscribe(res => {
        this.pessoa = res as Pessoa;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
   
  public redirectToOwnerList() {
    this.router.navigate(['/owner/list']);
  }

  public deletePessoa() {
    let deleteUrl: string = `api/owner/${this.pessoa.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
}
