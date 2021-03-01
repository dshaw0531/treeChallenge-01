import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  form: any;
  factoryId: number;
  title: string;
  name: string;
  valid: boolean = true;

  constructor(
    private fb: FormBuilder,
    private diaglogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
    ) { 
      this.title = data.title,
      this.factoryId = data.id,
      this.name = data.currentName
    }

  ngOnInit(){
    this.form = this.fb.group({
      id: this.factoryId,
      name: [this.name,[Validators.required]]
    })
  }

  close(){
    this.diaglogRef.close();
  }

  save(){
    if(this.form.valid) {
      this.diaglogRef.close({ event: 'close', id: this.form.value.id, name: this.form.value.name });
    }
  }
}
