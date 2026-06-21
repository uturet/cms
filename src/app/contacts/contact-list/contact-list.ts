import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'app-contact-list',
  imports: [ContactItem, RouterLink, ContactsFilterPipe],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string = '';
  subscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
    this.contactService.getContacts();
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
