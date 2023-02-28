import { Injectable } from '@angular/core';
// import * as pouchdb from 'pouchdb-http';
import PouchDbFind from 'pouchdb-find'
import pouchdb from 'pouchdb';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: any;
  remote: any;

  _tablesSubject = new Subject()
  // withCredentials?: boolean;

  constructor() {
    pouchdb.plugin(PouchDbFind);
    this.db = new pouchdb('restaurant-app');
    // this.remote = 'http://127.0.0.1:5984/_utils/#database/restaurant-app/_all_docs'
    this.remote = 'http://admin:root@127.0.0.1:5984/restaurant-app/';
    const options = {
      live: true,
      retry: true,
      // withCredentials: true,
    }
    this.db.sync(this.remote, options).catch((err: any) => {
      console.error(err)
    });
    this.db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change: any) => {
      if(change.doc.type === 'table') {
        console.warn('change detected on table document');
        console.warn(change.doc);
        // this._tablesSubject.next(true)
        this._tablesSubject.next(change.doc)
      }
    })

  }

  getCurrentTableChanges() {
    return this._tablesSubject.asObservable();
  }

  handleChange<T extends { _id?: string } >(
    subject: BehaviorSubject<Array<T>>,
    changeDoc: any, 
    updateManually: Function) {
    let docs = subject.getValue();
    var idx = docs.findIndex((x: T) => x._id === changeDoc.id);

    if(idx === -1) {
      updateManually();
    }
    docs[idx] = changeDoc;
    console.warn(docs);
    subject.next(docs);
  }
}
