import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';

@Component({
  selector: 'app-message-list',
  imports: [MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messages: Message[] = [
    new Message('1', 'Welcome', 'Welcome to the CMS application!', 'Kent Jackson'),
    new Message('2', 'Meeting', 'Don\'t forget about the team meeting on Friday.', 'Rex Barzee'),
    new Message('3', 'Reminder', 'Please submit your weekly report by EOD.', 'Sergey Cybenko'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
