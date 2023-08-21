import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChathouseComponent } from './chathouse.component';

describe('ChathouseComponent', () => {
  let component: ChathouseComponent;
  let fixture: ComponentFixture<ChathouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChathouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChathouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
