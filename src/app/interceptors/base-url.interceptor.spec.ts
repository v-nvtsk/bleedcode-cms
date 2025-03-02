import {TestBed} from '@angular/core/testing';
import {
  HttpRequest, HttpHandlerFn,
} from '@angular/common/http';
import {baseUrlInterceptor} from './base-url.interceptor';
import {of} from 'rxjs';
import {getApiBaseUrl} from '@/utils/get-api-base-url';

describe('baseUrlInterceptor', () => {
  let next: jasmine.Spy<HttpHandlerFn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    next = jasmine.createSpy('next').and.returnValue(of({})); // Мок next
  });
  it('should add base URL to relative URLs', () => {
    const req = new HttpRequest('GET', '/api/data');

    TestBed.runInInjectionContext(() => {
      baseUrlInterceptor(req, next);
    });
    expect(next).toHaveBeenCalled();

    const modifiedReq = next.calls.mostRecent().args[0];
    const apiUrl = getApiBaseUrl();
  
    expect(modifiedReq.url).toBe(apiUrl + '/api/data');
  });
});
