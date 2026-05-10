import { Component } from '@angular/core';
import { DocumentItem } from '../document-item/document-item';

@Component({
  selector: 'app-document-list',
  imports: [DocumentItem],
  templateUrl: './document-list.html',
  styleUrl: './document-list.css',
})
export class DocumentList {}
