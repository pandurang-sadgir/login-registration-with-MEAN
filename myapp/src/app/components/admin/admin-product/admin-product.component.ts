import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Respsck } from 'src/app/model/respsck';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rate', 'qty', 'type', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  products: Product[];
  product: Product;
  fgproduct: FormGroup;
state = 'default';

  obj: any;
  constructor(private cs: CommonService, private fb: FormBuilder) {
    this.fgproduct = this.fb.group({
        name: [],
        rate: [],
        qty:  [],
        type: []
    });
  }


  ngOnInit(): void {
    this.cs.product_list().subscribe((products: Product[]) => {
       this.products = products;
       this.dataSource = new MatTableDataSource(this.products);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       // console.log(products);

    }
    );

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  select(row){
   this.product = row;  // this line is important for  update query  which require id
   // console.log(row);
   this.fgproduct = this.fb.group({
  name: [row.name],
  rate: [row.rate],
  qty:  [row.qty],
  type: [row.type]
});
   this.state = 'select';
  }

  add_new(){
    this.state = 'add_new';
    this.fgproduct = this.fb.group({
      name: [],
      rate: [],
      qty:  [],
      type: []
  });
  }
  back()
  {
this.state = 'default';
  }

  reloadtable(){
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  save(){
    const obj = this.fgproduct.value;
    console.log(obj);

    this.cs. product_add(obj).subscribe((resp: Respsck) => {
// console.log(resp);
    if (resp.ack){
      obj.id = resp.id;
      this.products.push(obj);
      this.reloadtable();

      this.cs.alert('success', 'product Inserted successfully');
      this.state = 'default';
    }else{
      this.cs.alert('error', resp.description);
    }
    });
  }
update(){
  // tslint:disable-next-line: prefer-const
  let obj = this.fgproduct.value;
  obj.id = this.product.id;
  console.log(obj);
  this.cs. product_update(obj).subscribe((resp: Respsck) => {
  if (resp.ack){
    this.products[this.products.indexOf(this.product)] = obj;
    this.reloadtable();
    this.cs.alert('success', 'product Updated successfully');
    this.state = 'default';
  }else{
    this.cs.alert('error', resp.description);
  }
  });

}
delete(){
  this.cs. product_delete(this.product.id).subscribe((resp: Respsck) => {
  if (resp.ack){
    this.products.splice(this.products.indexOf(this.product), 1);
    this.reloadtable();
    this.cs.alert('success', 'product Deleted successfully');
    this.state = 'default';
  }else{
    this.cs.alert('error', resp.description);
  }
  });

}
}
