import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaIconComponent } from './fa-icon.component';

describe('FaIconComponent', () => {
  let component: FaIconComponent;
  let fixture: ComponentFixture<FaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
