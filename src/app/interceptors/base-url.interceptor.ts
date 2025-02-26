import {HttpInterceptorFn} from '@angular/common/http';
import {getApiBaseUrl} from '../../utils/get-api-base-url';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = getApiBaseUrl();
  const isAbsolute = req.url.startsWith('http');
  const apiReq = isAbsolute ? req : req.clone({url: `${baseUrl}${req.url}`});
  
  return next(apiReq);
};
