import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { environment } from '../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class RecordService {
  recordsCollection: AngularFirestoreCollection<Record>;

  constructor(private afs: AngularFirestore) {
    this.recordsCollection = afs.collection<Record>('records');
  }

  persist(record: Record) {
    this.recordsCollection.add(this.copyAndPrepare(record));
  }

  findAll() {
    return this.recordsCollection.get()
      .toPromise()
      .then(snapshot =>
        snapshot.docs.map(doc => {
          const record = doc.data();
          record.id = doc.id;
          return record;
        }));
  }

  findById(id: string) {
    return this.recordsCollection.doc(id).get().toPromise().then(res => {
      const ret = res.data();
      ret.id = res.id;
      return ret;
    });
  }

  update(record: Record) {
    this.recordsCollection.doc(record.id).update(this.copyAndPrepare(record));
  }

  delete(id: string) {
    this.recordsCollection.doc(id).delete();
  }

  private copyAndPrepare(record: Record): Record {
    const copy = { ...record };
    delete copy.id;
    copy.grade = copy.grade || null;
    return copy;
  }

  findAllSync() {
    return this.recordsCollection.valueChanges({ idField: 'id' });
  }
}
