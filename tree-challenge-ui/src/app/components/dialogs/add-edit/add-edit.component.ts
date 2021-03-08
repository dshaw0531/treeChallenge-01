import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FactoryService } from 'src/app/services/factory-service/factory.service';

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
    private factoryService: FactoryService,
    @Inject(MAT_DIALOG_DATA) data: any
    ) { 
      this.title = data.id === undefined ? "Add Factory" : "Edit Factory",
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
      this.name = this.form.value.name;

      if (this.factoryId != null && this.name != null) {
        this.factoryService.editFactory(this.factoryId, this.name).subscribe();
      } else if (this.name !== undefined) {
        this.factoryService.addFactory(this.name).subscribe();
      };

      this.close();
    }
  }
}
