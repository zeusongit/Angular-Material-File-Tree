import { Component, OnInit ,Inject} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MAT_DIALOG_DATA} from '@angular/material';
import { SharedDataService } from "../../shared/shared-data.service";
import { UtilService } from "../../shared/util.service";


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
}

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {

  isDirectory=true;
  selectedNode={};

  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public dataService:SharedDataService, public util:UtilService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    
let TREE_DATA: FileNode[] = [
  this.data
  // {
  //   name: 'Fruit',
  //   type: 'D',
  //   children: [
  //     {name: 'Apple' ,type: 'D'},
  //     {name: 'Banana' ,type: 'D'},
  //     {name: 'Fruit loops' ,type: 'D'},
  //   ]
  // }, {
  //   name: 'Vegetables',
  //   type: 'D',
  //   children: [
  //     {
  //       name: 'Green',
  //       type: 'D',
  //       children: [
  //         {name: 'Broccoli' ,type: 'D'},
  //         {name: 'Brussel sprouts' ,type: 'F'},
  //       ]
  //     }, {
  //       name: 'Orange',
  //       type: 'D',
  //       children: [
  //         {name: 'Pumpkins' ,type: 'D'},
  //         {name: 'Carrots' ,type: 'F'},
  //       ]
  //     },
  //   ]
  // },
];


    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  selectNode(node){
    console.log(node);
    if(node.type=="D"){
      this.isDirectory=true;
    }
    else{
      this.selectedNode=node;
      this.isDirectory=false;
    }
  }

  onSelect(node){
    console.log("node saved!");
    this.dataService.saveSharedData(node.name);
  }

  ngOnInit() {
  }

}
