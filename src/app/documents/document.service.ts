import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private dbUrl =
    'https://wdd430-c0c69-default-rtdb.firebaseio.com/documents.json';

  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number = 0;

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http
      .get<Document[]>(this.dbUrl)
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents ?? [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.dbUrl, documentsString, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
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

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
