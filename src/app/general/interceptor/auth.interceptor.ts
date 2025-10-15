import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { UserStateService } from '../services/user-state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq;
  const platformId = inject(PLATFORM_ID);
  const userState: UserStateService = inject(UserStateService);
  const msgSrv: MessageToastService = inject(MessageToastService);
  newReq = req.clone({ withCredentials: true });
  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && isPlatformBrowser(platformId)) {
        if (error.error) {
          let msg = error.error?.message;
          switch (error.status) {
            case 0:
              msg = msg ?? 'CORS ERROR';
              msgSrv.showError(msg);
              break;
            case 401:
              msg = JSON.stringify(error) ?? 'Your Credential is Invalid';
              msgSrv.showError(msg);
              userState.strategy()?.logout();
              break;
            case 404:
              msg = msg ?? 'Your API not found';
              msgSrv.showError(msg);
              break;
            case 405:
              msg = msg ?? 'Method Not Allowed';
              msgSrv.showError(msg);
              break;
            case 400:
              msg = error.error.message ?? 'Bad Request!';
              msgSrv.showError(msg);
              break;
            case 500:
            default:
              msgSrv.showError('An unexpected error occurred');
              break;
          }
        }
      }
      return throwError(() => error);
    }),
  );
};
