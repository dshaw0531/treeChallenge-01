import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectInstructionsComponent } from './collect-instructions.component';

describe('CollectInstructionsComponent', () => {
  let component: CollectInstructionsComponent;
  let fixture: ComponentFixture<CollectInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
