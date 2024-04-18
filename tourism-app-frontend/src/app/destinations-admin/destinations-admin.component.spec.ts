import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsAdminComponent } from './destinations-admin.component';

describe('DestinationsAdminComponent', () => {
  let component: DestinationsAdminComponent;
  let fixture: ComponentFixture<DestinationsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
