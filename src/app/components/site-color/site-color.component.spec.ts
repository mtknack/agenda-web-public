import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteColorComponent } from './site-color.component';

describe('SiteColorComponent', () => {
  let component: SiteColorComponent;
  let fixture: ComponentFixture<SiteColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
