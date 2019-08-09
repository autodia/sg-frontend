import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesheetComponent } from './samplesheet.component';

describe('SamplesheetComponent', () => {
  let component: SamplesheetComponent;
  let fixture: ComponentFixture<SamplesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
