import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Contacts, Documents, MessageList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cms');
  selectedFeature = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
