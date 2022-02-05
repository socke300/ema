import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private records: Record[];
  private nextId: number;

  constructor() {
    const recordsJSON: string = localStorage.getItem('records');

    if (recordsJSON) {
      this.records = JSON.parse(recordsJSON);
      this.nextId = parseInt(localStorage.getItem('nextId'));
    } else {
      this.records = [];
      this.nextId = 1;
      if (!environment.production) {
        this.persist(new Record(1, 'CS1013', 'Objektorientierte Programmierung', 6, 73, true, true, 2016));
        this.persist(new Record(2, 'MN1007', 'Diskrete Mathematik', 6, 81, true, false, 2016));
        this.persist(new Record(3, 'CS1019', 'Compilerbau', 6, 81, false, false, 2017));
      }
    }
  }

  persist(record: Record) {
    record.id = this.nextId++;
    this.records.push(record);
    this.save();
  }

  private save(): void {
    localStorage.setItem('records', JSON.stringify(this.records));
    localStorage.setItem('nextId', this.nextId.toString());
  }

  findAll() {
    return this.records;
  }

  findById(recordId: number) {
    return this.records.find(r => r.id == recordId);
  }

  update(record: Record) {
    if (this.findById(record.id)) {
      Object.assign(this.records[this.records.findIndex(r => r.id == record.id)], record);
      this.save();
      return true;
    }
    return false;
  }


  delete(recordId: number) {
    if (this.findById(recordId)) {
      this.records.splice(this.records.findIndex(r => r.id === recordId), 1);
      this.save();
      return true;
    }
    return false;
  }
}
