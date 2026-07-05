import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private dbUrl = 'http://localhost:3000/messages';

  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number = 0;

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ message: string; messages: Message[] }>(this.dbUrl)
      .subscribe(
        // success method
        (responseData) => {
          this.messages = responseData.messages ?? [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
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

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; messageData: Message }>(this.dbUrl, message, {
        headers: headers,
      })
      .subscribe((responseData) => {
        this.messages.push(responseData.messageData);
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((m) => m.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(this.dbUrl + '/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe(() => {
        this.messages[pos] = newMessage;
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((m) => m.id === message.id);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.dbUrl + '/' + message.id).subscribe(() => {
      this.messages.splice(pos, 1);
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }
}
