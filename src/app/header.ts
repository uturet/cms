import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'app-header',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
