import { Component, OnInit } from '@angular/core';
import { TableDoc } from 'src/app/model/table';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
})
export class TablesPage implements OnInit {
  tables: Array<TableDoc> = new Array<TableDoc>();
  constructor(private tableService: TableService) {}

 
 /* tables = [     // step:A
    {
      type: 'table',
      table: {
        id: '1',
        guests: 6,
        state: 'free',
      },
    },
    {
      type: 'table',
      table: {
        id: '2',
        guests: 4,
        state: 'dirty',
      },
    },
  ];    */

  ngOnInit() {}

  ngAfterViewInit() {
    this.tableService.getCurrentTables().subscribe((tableDocs) => {
      this.tables = tableDocs;
    });
    this.tableService.fetchTables();
  }
}
