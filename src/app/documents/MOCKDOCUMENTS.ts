import { Document } from './document.model';

export const MOCKDOCUMENTS: Document[] = [
  new Document('1', 'Angular Guide', 'Official Angular documentation and guide', 'https://angular.io/docs', null),
  new Document('2', 'TypeScript Handbook', 'Complete TypeScript language reference', 'https://www.typescriptlang.org/docs/', null),
  new Document('3', 'Bootstrap Docs', 'Bootstrap CSS framework documentation', 'https://getbootstrap.com/docs/', null),
  new Document('4', 'RxJS Reference', 'Reactive Extensions for JavaScript', 'https://rxjs.dev/guide/overview', null),
  new Document('5', 'Node.js Guide', 'Node.js official documentation', 'https://nodejs.org/en/docs/', null),
];
