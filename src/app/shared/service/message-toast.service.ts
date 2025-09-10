import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageToastService {
  constructor(private messageService: MessageService) {}

  private customMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
  showMessage(message: string, succeeded: boolean) {
    this.customMessage(succeeded ? 'success' : 'error', 'تمت العملية بنجاح', message);
  }
  showSuccess(message: string) {
    this.customMessage('success', 'تمت العملية بنجاح', message);
  }

  showInfo(message: string) {
    this.customMessage('info', 'معلومة', message);
  }

  showWarn(message: string) {
    this.customMessage('warn', 'تنبيه', message);
  }

  showError(message: string) {
    this.customMessage('error', 'خطأ', message);
  }

  showSecondary(message: string, title: string) {
    this.customMessage('secondary', title, message);
  }
}
