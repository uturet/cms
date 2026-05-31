import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'app-contacts',
  imports: [RouterOutlet, ContactList],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {}
