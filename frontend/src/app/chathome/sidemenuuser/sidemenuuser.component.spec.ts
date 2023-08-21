import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuuserComponent } from './sidemenuuser.component';

describe('SidemenuuserComponent', () => {
  let component: SidemenuuserComponent;
  let fixture: ComponentFixture<SidemenuuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidemenuuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
