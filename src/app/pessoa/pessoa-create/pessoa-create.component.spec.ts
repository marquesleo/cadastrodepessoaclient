import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCreateComponent } from './pessoa-create.component';

describe('OwnerCreateComponent', () => {
  let component: PessoaCreateComponent;
  let fixture: ComponentFixture<PessoaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
