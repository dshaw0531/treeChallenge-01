import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerationInstructions } from 'src/app/models/generation-instructions-model';
import { FactoryService } from 'src/app/services/factory-service/factory.service';

@Component({
  selector: 'app-collect-instructions',
  templateUrl: './collect-instructions.component.html',
  styleUrls: ['./collect-instructions.component.scss']
})
export class CollectInstructionsComponent implements OnInit {
  form: any;
  title: string;
  factoryId: number;
  limitsError: boolean = false;
  
  constructor(
    private fb: FormBuilder,
    private diaglogRef: MatDialogRef<CollectInstructionsComponent>,
    private factoryService: FactoryService,
    @Inject(MAT_DIALOG_DATA) data: any
    ) { 
      this.title = data.title,
      this.factoryId = data.id
    }

  ngOnInit(){
    this.form = this.fb.group({
      factoryId: [this.factoryId,[]],
      numberOfChildren: ['',[Validators.required, Validators.max(15), Validators.min(1),Validators.pattern("^[0-9]*$")]],
      upperLimit: ['',[Validators.required,Validators.min(0),Validators.pattern("^[0-9]*$")]],
      lowerLimit: ['',[Validators.required,Validators.min(0),Validators.pattern("^[0-9]*$")]],
    })
    
    this.subscribeLimitChanges();
  }

  subscribeLimitChanges() {
    let upperLimitControl = <FormControl>this.form.get('upperLimit');
    let lowerLimitControl = <FormControl>this.form.get('lowerLimit');

    upperLimitControl.valueChanges.subscribe(v => {
      this.setValidators(upperLimitControl, lowerLimitControl);
    });

    lowerLimitControl.valueChanges.subscribe(v => {
      this.setValidators(upperLimitControl, lowerLimitControl);
    });
  }

  setValidators(upperLimitControl: any, lowerLimitControl:any) {
    upperLimitControl.setValidators(
      [Validators.required, Validators.min(lowerLimitControl.value), Validators.pattern("^[0-9]*$")]
    );

    lowerLimitControl.setValidators(
      [Validators.required, Validators.min(0), Validators.max(upperLimitControl.value), Validators.pattern("^[0-9]*$")]
    );

  }

  close(){
    this.diaglogRef.close();
  }

  save() {
    if (this.form.valid) {
      let instructions = new GenerationInstructions();
      instructions.id = this.factoryId;
      instructions.numberOfChildren = this.form.value.numberOfChildren;
      instructions.upperLimit = this.form.value.upperLimit;
      instructions.lowerLimit = this.form.value.lowerLimit;
      
      this.factoryService.generateChildren(this.factoryId, instructions).subscribe();

      this.diaglogRef.close(this.factoryId);
    }
  }
}
