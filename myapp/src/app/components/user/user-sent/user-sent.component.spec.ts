import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSentComponent } from './user-sent.component';

describe('UserSentComponent', () => {
  let component: UserSentComponent;
  let fixture: ComponentFixture<UserSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
