import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDestinationsComponent } from './available-destinations.component';

describe('AvailableDestinationsComponent', () => {
  let component: AvailableDestinationsComponent;
  let fixture: ComponentFixture<AvailableDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
