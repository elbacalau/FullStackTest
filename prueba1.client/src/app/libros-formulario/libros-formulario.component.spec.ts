import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosFormularioComponent } from './libros-formulario.component';

describe('LibrosFormularioComponent', () => {
  let component: LibrosFormularioComponent;
  let fixture: ComponentFixture<LibrosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
