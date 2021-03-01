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

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.childNodes && node.childNodes.length > 0,
      name: node.name,
      level: level,
      showButtons: node.factoryId === undefined && node.id > 0,
      id: node.id
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
    this.factoryService.getFactories().subscribe(factories => 
      { 
        this.dataSource.data = [{ id: 0, name: "Root",  childNodes: factories}];
        this.treeControl.expand(this.treeControl.dataNodes[0]);
      });
  };

  hasChild = (_: number, node: FlatNode) => node.expandable;

  deleteFactory(id: number){
    this.factoryService.deleteFactory(id).subscribe();
  }

  deleteChildNode(id: number){
    this.factoryService.deleteChildNode(id).subscribe();
  }

  openNameDialog(factoryId?: number, currentName?: string) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: factoryId,
        title: factoryId === undefined ? "Add Factory" : "Edit Factory",
        currentName: currentName
      }

      this.dialog.open(AddEditComponent, dialogConfig);
  }

  openCollectInstructionsDialog(factoryId?: number, currentName?: string) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: factoryId,
      title: currentName
    }

    this.dialog.open(CollectInstructionsComponent, dialogConfig);
}
}
