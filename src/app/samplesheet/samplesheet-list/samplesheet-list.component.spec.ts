import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesheetListComponent } from './samplesheet-list.component';

describe('SamplesheetListComponent', () => {
  let component: SamplesheetListComponent;
  let fixture: ComponentFixture<SamplesheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
