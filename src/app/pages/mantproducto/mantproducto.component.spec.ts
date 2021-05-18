import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantproductoComponent } from './mantproducto.component';

describe('MantproductoComponent', () => {
  let component: MantproductoComponent;
  let fixture: ComponentFixture<MantproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
