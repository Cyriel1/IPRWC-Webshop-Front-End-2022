import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ProfileStorageService {
  shopPath: string = '/api/shop';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

}
