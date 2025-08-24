import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { UserStateService } from '../services/user-state.service';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { MessageToastService } from '../../shared/service/message-toast.service';
import { Router } from '@angular/router';
import { APIResponse } from '../../shared/interface/response';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let newReq;
  const userState: UserStateService = inject(UserStateService);
  const authSrv: AuthService = inject(AuthService);
  const msgSrv: MessageToastService = inject(MessageToastService);
  const router: Router = inject(Router);
  if (userState.isBrowser() && localStorage.getItem('accessToken')) {
    const token = `Bearer ${localStorage.getItem('accessToken')}`;
    newReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  } else {
    newReq = req;
  }
  newReq = newReq.clone({
    setHeaders: {
      'Device-Id': `${localStorage.getItem('fingerPrint')}`,
    },
  });
  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error) {
          let msg = error.error?.message;
          switch (error.status) {
            case 401:
              msg = msg ?? 'Your Credential is Invalid';
              if (error.error.data === 1 && userState.isBrowser()) {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                  authSrv.updateToken(refreshToken).subscribe((res) => {
                    userState.setToken(res.data.accessToken, res.data.refreshToken);
                  });
                }
              } else {
                msgSrv.showError(msg);
                router.navigate(['auth/login']);
              }
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
    }),
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const result = event.body as APIResponse<any>;
        if (result && result.succeeded) {
          let msg = result.message ?? 'عملية ناجحة';
          msgSrv.showSuccess(msg);
        }
      }
    })
  );
};
