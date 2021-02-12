import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaDetailsComponent } from './pessoa-details/pessoa-details.component';
import { PessoaCreateComponent } from './pessoa-create/pessoa-create.component';
import { PessoaUpdateComponent } from './pessoa-update/pessoa-update.component';
import { PessoaDeleteComponent } from './pessoa-delete/pessoa-delete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'list', component: PessoaListComponent },
      { path: 'details/:id', component: PessoaDetailsComponent },
      { path: 'create', component: PessoaCreateComponent },
      { path: 'update/:id', component: PessoaUpdateComponent },
      { path: 'delete/:id', component: PessoaDeleteComponent }
    ])
  ],
  declarations: [
    PessoaListComponent,
    PessoaDetailsComponent,
    PessoaCreateComponent,
    PessoaUpdateComponent,
    PessoaDeleteComponent
  ]
})
export class OwnerModule { }