import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeNode } from '../../models/tree-node-model';
import { FlatNode } from '../../models/flat-node-model';
import { FactoryService } from 'src/app/services/factory-service/factory.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../dialogs/add-edit/add-edit.component';
import { CollectInstructionsComponent } from '../dialogs/collect-instructions/collect-instructions.component';
import { SignalRService } from 'src/app/services/signal-r-service/signal-r.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  dialogId: number = 0;
  dialogName: string = '';
  generatedParentId: number = 0;
  deletedParentId: number = 0;
  instructions: any;

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.childNodes && node.childNodes.length > 0,
      name: node.name,
      level: level,
      showButtons: node.factoryId === undefined && node.id > 0,
      id: node.id,
      factoryId: (node.factoryId === undefined) ? 0 : node.factoryId
    };
  }

  ngOnInit() {
    this.signalRService.signalReceived.subscribe((signal: TreeNode) => {
      this.getFactoryList();
    })
  }

  treeControl = new FlatTreeControl<FlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.childNodes);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private factoryService: FactoryService,
    private dialog: MatDialog,
    private signalRService: SignalRService
  ){
    this.getFactoryList();
  }

  getFactoryList(){
    this.factoryService.getFactories().subscribe(factories => {
        this.dataSource.data = [{ id: 0, name: "Root",  childNodes: factories}];
        this.treeControl.expand(this.treeControl.dataNodes[0]);

        if (this.generatedParentId != null) {
          this.expand(this.generatedParentId);
          this.generatedParentId = 0;
        };

        if (this.deletedParentId != null) {
          this.expand(this.deletedParentId);
          this.deletedParentId = 0;
        };
      });
  }

  expand(parentId: any) {
    let index = this.treeControl.dataNodes.map(function(x) {return x.id;}).indexOf(parentId);
    this.treeControl.expand(this.treeControl.dataNodes[index]);
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  deleteFactory(id: number){
    this.factoryService.deleteFactory(id).subscribe();
  }

  deleteChildNode(factoryId: number, childId: number){
    this.deletedParentId = factoryId;
    this.factoryService.deleteChildNode(childId).subscribe();
  }

  openNameDialog(factoryId?: number, currentName?: string) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: factoryId,
        title: factoryId === undefined ? "Add Factory" : "Edit Factory",
        currentName: currentName
      };

      const dialogRef = this.dialog.open(AddEditComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        this.dialogId = result?.id;
        this.dialogName = result?.name;
        
        if (this.dialogId != null && this.dialogName != null) {
          this.editFactory(this.dialogId, this.dialogName);
        } else if (this.dialogName !== undefined) {
          this.addFactory(this.dialogName);
        };
      });
  }

  openCollectInstructionsDialog(factoryId?: number, currentName?: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: factoryId,
      title: currentName
    };

    const dialogRef = this.dialog.open(CollectInstructionsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.generatedParentId = result?.id;
      this.instructions = result?.instructions;
      
      if (this.generatedParentId != null && this.dialogName != null) {
        this.factoryService.generateChildren(this.generatedParentId, this.instructions).subscribe();
      };
    });
  }

  addFactory(name: string){
    this.factoryService.addFactory(name).subscribe();
  }

  editFactory(id: number, newName: string){
    this.factoryService.editFactory(id, newName).subscribe();
  }
}
