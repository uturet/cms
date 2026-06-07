import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactItem } from '../contact-item/contact-item';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  imports: [ContactItem, RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
})
export class ContactList implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
