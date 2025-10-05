import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  getImages(imageUrls: string[]): Observable<File[] | boolean> {
    let index = 0;
    const observables = imageUrls.map((url) =>
      this.http.get(url, { responseType: 'blob' }).pipe(
        map((blob) => {
          const filename = url.split('/').pop() || 'image.jpg';
          index += 1;
          return new File([blob], filename, { type: blob.type });
        }),
        catchError((err) => {
          // imageUrls.splice(index, 1);
          index += 1;
          return of(null);
        }),
      ),
    );
    if (observables.length > 0) {
      return forkJoin(observables).pipe(
        map((files) => files.filter((f): f is File => f !== null)), // filter out failed ones
      );
    }
    return of(true);
  }
}
