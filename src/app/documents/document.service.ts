import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private dbUrl = 'http://localhost:3000/documents';

  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.dbUrl)
      .subscribe(
        // success method
        (responseData) => {
          this.documents = responseData.documents ?? [];
          this.maxDocumentId = this.getMaxId();
          this.sortAndSend();
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(this.dbUrl, document, {
        headers: headers,
      })
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(this.dbUrl + '/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.dbUrl + '/' + document.id).subscribe(() => {
      this.documents.splice(pos, 1);
      this.sortAndSend();
    });
  }
}
