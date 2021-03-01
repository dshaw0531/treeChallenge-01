import { Component, Inject, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory-service/factory.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerationInstructions } from 'src/app/models/generation-instructions-model';

@Component({
  selector: 'app-collect-instructions',
  templateUrl: './collect-instructions.component.html',
  styleUrls: ['./collect-instructions.component.scss']
})
export class CollectInstructionsComponent implements OnInit {
  form: any;
  title: string;
  factoryId: number;
  
  constructor(
    private factoryService: FactoryService,
    private fb: FormBuilder,
    private diaglogRef: MatDialogRef<CollectInstructionsComponent>,
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

  this.validateLimits(upperLimitControl, lowerLimitControl);
}

limitsError: boolean = false;
validateLimits(upperLimitControl: any, lowerLimitControl: any): void{
   if(upperLimitControl.value && lowerLimitControl.value){
       this.limitsError = upperLimitControl.value < lowerLimitControl.value;
    }
}

  close(){
    this.diaglogRef.close()
  }

  save() {
    if (this.form.valid) {
      let instructions = new GenerationInstructions();
      instructions.id = this.factoryId;
      instructions.numberOfChildren = this.form.value.numberOfChildren;
      instructions.upperLimit = this.form.value.upperLimit;
      instructions.lowerLimit = this.form.value.lowerLimit;

      this.diaglogRef.close({ event: 'close', id: this.factoryId, instructions: instructions });
    }
  }
}
