import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private dbUrl = 'http://localhost:3000/contacts';

  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number = 0;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.dbUrl)
      .subscribe(
        // success method
        (responseData) => {
          this.contacts = responseData.contacts ?? [];
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  sortAndSend() {
    this.contacts.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    this.contactListChangedEvent.next(this.contacts.slice());
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

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(this.dbUrl, contact, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(this.dbUrl + '/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.dbUrl + '/' + contact.id).subscribe(() => {
      this.contacts.splice(pos, 1);
      this.sortAndSend();
    });
  }
}
