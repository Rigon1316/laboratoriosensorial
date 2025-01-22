import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

interface Column {
  header: string;
  key: string;
}
@Component({
  selector: 'app-table',
  templateUrl:'./table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class TableComponent implements AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() showView: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.displayedColumns = [...this.columns.map(column => column.key), 'Acciones'];
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}
