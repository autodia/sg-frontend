/**
 * @module Services
 */

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AppError } from '../errors/app-error';
import { BadInputError } from '../errors/bad-request-error';
import { ConflictError } from '../errors/conflict-error';
import { NotFoundError } from '../errors/not-found-error';

export abstract class DataService<T> {
  private url: string;

  constructor(public http: HttpClient, resource: string, private includeToken: boolean = true) {
    this.url = environment.url + "/" + resource;
  }

  /**
   * Gets all resources on a endpoint
   * @param nested boolean if True then retrieves nested objects of the endpoint resource
   * @param params dictionary of request params
   */
  getAll(nested?: boolean, params?: Map<string, any>) {
    const options = this.createOptions(params);
    const url = nested ? this.url + "-nested" : this.url;

    return this.http.get<T[]>(url + '/', options).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  /**
   * Gets a single reqource given an ID
   * @param id resource id to GET
   * @param nested boolean if True then retrieves nested objects of the endpoint resource
   * @param params dictionary of request params
   */
  get(id, nested?: boolean, params?: Map<string, string>) {
    const options = this.createOptions(params);

    const url = nested ? this.url + "-nested" : this.url;

    return this.http.get<T>(url + '/' + id + '/', options).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  /**
   * POST request to creates a resource 
   * @param resource the resource to create
   * @param nested boolean if True then retrieves nested objects of the endpoint resource
   * @param params dictionary of request params
   */
  create(resource: any, nested?: boolean, params?: Map<string, string>): Observable<T> {
    const options = this.createOptions(params);
    const url = nested ? this.url + "-nested" : this.url;

    return this.http.post<T>(url + '/', resource, options).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    );
  }

  /**
   * PUT request to update a resource 
   * @param resource the resource to create
   * @param nested boolean if True then retrieves nested objects of the endpoint resource
   * @param params dictionary of request params
   */
  update(resource, nested?: boolean, params?: Map<string, string>): Observable<T> {
    const options = this.createOptions(params);
    const url = nested ? this.url + "-nested" : this.url;

    return this.http.put<T>(url + '/' + resource.id + '/', resource, options).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    )
  }

  /**
   * PATCH request to update a resource's fields
   * @param resource the data fields of the resource to update
   * @param nested boolean if True then retrieves nested objects of the endpoint resource
   * @param params dictionary of request params
   */
  patch(id, resource, params?: Map<string, string>): Observable<T> {
    const options = this.createOptions(params);

    return this.http.patch<T>(this.url + '/' + id + '/', resource, options).pipe(
      map(this.handleResponse),
      catchError(this.handleError)
    )
  }

  /**
   * Deletes a single reqource given an ID
   * @param id resource id to delete
   * @param params dictionary of request params
   */
  delete(id, params?: Map<string, string>) {
    const options = this.createOptions(params);

    return this.http.delete(this.url + '/' + id + "/", options)
      .pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param data Converts returned any object from httpclient to actual typescript class
   */
  abstract handleResponse(data: any);

  /**
   * returns the options (headers, request params) 
   * @param paramMap the request params as dictionary
   */
  createOptions(paramMap?: Map<string, string>) {
    let params = this.construcParams(paramMap);
    let headers = {}

    if (this.includeToken)
      this.addHeaderToken(headers)

    return { headers: headers, params: params }
  }

  /**
   * Adds auth token to request headers
   * @param headers the current request headers
   */
  addHeaderToken(headers: any) {
    let token = localStorage.getItem('token')
    headers['Authorization'] = 'Bearer ' + token
  }

  /**
   * Translates dictionary of params to HttpParams which httpclient understands
   * @param paramMap dictionary of params
   */
  construcParams(paramMap: Map<string, string>): HttpParams {
    if (!paramMap) return null;

    let httpParams = new HttpParams();
    paramMap.forEach((value: string, key: string) => {
      httpParams = httpParams.append(key, value);
    });

    return httpParams;
  }

  /**
   * Handles httperrors and throws as own errors
   * @param error http error
   */
  handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    } else if (error.status === 400) {
      return throwError(new BadInputError(error));
    } else if (error.status === 409) {
      return throwError(new ConflictError(error));
    } else {
      return throwError(new AppError(error));
    }
  }
}