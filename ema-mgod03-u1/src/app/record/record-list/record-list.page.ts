import { Component } from '@angular/core';
import {Record}    from '../record.model';
import {Statistic} from '../statistic.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})

export class RecordListPage {
  records: Record[] = [];

  constructor() { // id, moduleNr, moduleName, crp, grade, halfWeighted, summerTerm, year 
    this.records.push(
      new Record(1, 'CS1013', 'Objektorientierte Programmierung', 6, 73, true, true, 2016),
      new Record(2, 'MN1007', 'Diskrete Mathematik', 6, 81, true, false, 2016),
      new Record(3, 'CS1019', 'Compilerbau', 6, 81, false, false, 2017),
      new Record(4, 'CS1020', 'Datenbanksysteme', 6, 92, false, false, 2017)
    );
  }

  createRecord(): void {
    console.log('Not implemented yet!');
  }

  showStats(): void {
    const Statistic1 = new Statistic(this.records);
    console.log(Statistic1.recordCount);
    console.log(Statistic1.hwCount);
    console.log(Statistic1.sumCrp);
    console.log(Statistic1.crpToEnd);
    console.log(Statistic1.averageGrade);
  }
}