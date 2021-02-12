import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaDeleteComponent } from './pessoa-delete.component';

describe('OwnerDeleteComponent', () => {
  let component: PessoaDeleteComponent;
  let fixture: ComponentFixture<PessoaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
