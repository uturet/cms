import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'app-header',
  imports: [DropdownDirective],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
