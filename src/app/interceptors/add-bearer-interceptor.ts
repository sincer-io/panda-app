import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export class AddBearerInterceptor implements HttpInterceptor {
    private authSvc = new AuthenticationService();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.indexOf('/api/authentication') !== -1){
            return next.handle(req);
        }
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authSvc.getToken()) });
        return next.handle(clonedRequest);
    }
}
