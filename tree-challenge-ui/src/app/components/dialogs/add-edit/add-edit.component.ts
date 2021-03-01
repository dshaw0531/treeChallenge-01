import { Component, Inject, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory-service/factory.service';
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
    private factoryService: FactoryService,
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
      name: [this.name,[Validators.required]]
    })
  }

  close(){
    this.diaglogRef.close()
  }

  save(){
    if(this.form.valid) {
      if (this.factoryId !== undefined) {
        this.editFactory(this.factoryId, this.form.value.name)
      } else {
        this.addFactory(this.form.value.name);
      }

      this.close();
    }
  }

  addFactory(name: string){
    this.factoryService.addFactory(name).subscribe();
  }

  editFactory(id: number, newName: string){
    this.factoryService.editFactory(id, newName).subscribe();
  }
}
