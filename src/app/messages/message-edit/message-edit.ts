import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  imports: [],
  templateUrl: './message-edit.html',
  styleUrl: './message-edit.css',
})
export class MessageEdit {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Sergey Cybenko';

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
