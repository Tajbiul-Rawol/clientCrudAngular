import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradelistComponent } from './tradelist.component';

describe('TradelistComponent', () => {
  let component: TradelistComponent;
  let fixture: ComponentFixture<TradelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
