import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { UserStateService } from '../services/user-state.service';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { MessageToastService } from '../../shared/service/message-toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq;
  const userState: UserStateService = inject(UserStateService);
  const msgSrv: MessageToastService = inject(MessageToastService);

  return from(userState.fingerPrint()).pipe(
    switchMap((fingerPrint) => {
      newReq = req.clone({
        setHeaders: {
          'Device-Id': `${fingerPrint}`,
        },
        withCredentials: true,
      });
      return next(newReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error) {
              let msg = error.error?.message;
              switch (error.status) {
                case 0:
                  msg = msg ?? 'CORS ERROR';
                  msgSrv.showError(msg);
                  break;
                case 401:
                  msg = msg ?? 'Your Credential is Invalid';
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
                case 0:
                  msgSrv.showError('Internal Server Error');
                  break;
                default:
                  msgSrv.showError('An unexpected error occurred');
                  break;
              }
            }
          }
          return throwError(() => error);
        })
      );
    })
  );
};
