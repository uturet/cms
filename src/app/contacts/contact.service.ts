import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private dbUrl =
    'https://wdd430-c0c69-default-rtdb.firebaseio.com/contacts.json';

  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<Contact[]>(this.dbUrl)
      .subscribe(
        // success method
        (contacts: Contact[]) => {
          this.contacts = contacts ?? [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.dbUrl, contactsString, { headers })
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
