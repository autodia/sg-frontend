import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from 'src/app/common/model/sample';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent implements OnInit {
  @Input() samples: Sample[]
  @Output() backClicked = new EventEmitter()

  form: FormGroup

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = this.builder.group({
      samplesArray: new FormArray([])
    });

    this.samples.forEach(s => {
      this.addSampleRow(s)
    });
  }

  addSampleRow(s: Sample) {
    const samplesArray = <FormArray>(this.form.controls.samplesArray);
    samplesArray.push(this.initSampleFormGroup(s))
  }

  initSampleFormGroup(s: Sample): FormGroup {
    return this.builder.group({
      lane: new FormControl(s.lane, Validators.required),
      number: new FormControl(s.number, Validators.required),
      type: new FormControl(s.type, Validators.required),
      library: new FormControl(s.library, Validators.required),
      index1: new FormControl(s.index1, Validators.required),
      index2: new FormControl(s.index2, []),
      description: new FormControl(s.description, [])
    })
  }

  back() {
    this.backClicked.emit(null);
  }

  submit(formData: FormData) {
    console.log("Form Data: ", formData)
    console.log("Samples: ", this.samples)
  }
}
