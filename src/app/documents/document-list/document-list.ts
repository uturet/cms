import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItem } from '../document-item/document-item';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }
}
