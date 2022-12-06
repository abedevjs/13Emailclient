import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  URL = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.URL}/emails`)
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.URL}/emails/${id}`)
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.URL}/emails`, email)
  }

}
