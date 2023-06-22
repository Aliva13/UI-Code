import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecordComponent } from './menu-record.component';

describe('MenuRecordComponent', () => {
  let component: MenuRecordComponent;
  let fixture: ComponentFixture<MenuRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRecordComponent]
    });
    fixture = TestBed.createComponent(MenuRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
