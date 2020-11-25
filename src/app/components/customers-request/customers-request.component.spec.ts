import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRequestComponent } from './customers-request.component';

describe('CustomersRequestComponent', () => {
  let component: CustomersRequestComponent;
  let fixture: ComponentFixture<CustomersRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
