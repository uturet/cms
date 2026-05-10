import { Component } from '@angular/core';
import { ContactList } from './contact-list/contact-list';
import { ContactDetail } from './contact-detail/contact-detail';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  imports: [ContactList, ContactDetail],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  selectedContact: Contact | null = null;
}
