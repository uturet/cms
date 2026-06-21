import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private dbUrl =
    'https://wdd430-c0c69-default-rtdb.firebaseio.com/messages.json';

  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<Message[]>(this.dbUrl)
      .subscribe(
        // success method
        (messages: Message[]) => {
          this.messages = messages ?? [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(this.dbUrl, messagesString, { headers })
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    this.maxMessageId++;
    message.id = String(this.maxMessageId);
    this.messages.push(message);
    this.storeMessages();
  }
}
