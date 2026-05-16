import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItem } from '../document-item/document-item';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Angular Guide', 'Official Angular documentation and guide', 'https://angular.io/docs', null),
    new Document('2', 'TypeScript Handbook', 'Complete TypeScript language reference', 'https://www.typescriptlang.org/docs/', null),
    new Document('3', 'Bootstrap Docs', 'Bootstrap CSS framework documentation', 'https://getbootstrap.com/docs/', null),
    new Document('4', 'RxJS Reference', 'Reactive Extensions for JavaScript', 'https://rxjs.dev/guide/overview', null),
    new Document('5', 'Node.js Guide', 'Node.js official documentation', 'https://nodejs.org/en/docs/', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
