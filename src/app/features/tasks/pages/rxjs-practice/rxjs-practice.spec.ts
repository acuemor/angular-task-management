import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsPractice } from './rxjs-practice';

describe('RxjsPractice', () => {
  let component: RxjsPractice;
  let fixture: ComponentFixture<RxjsPractice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsPractice],
    }).compileComponents();

    fixture = TestBed.createComponent(RxjsPractice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
