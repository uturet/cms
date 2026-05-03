import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Contacts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cms');
}
