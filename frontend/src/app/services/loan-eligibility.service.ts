import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanEligibilityService {

  private backendUrl = 'http://localhost:5000/api/predict_loan_eligibility';
  private resultsUrl = 'http://localhost:5000/api/eligibility-results';

  constructor(private http: HttpClient) { }

  submitApplication(applicationData: any): Observable<any> {
    return this.http.post(this.backendUrl, applicationData);
  }

  getEligibilityResults(): Observable<any> {
    return this.http.get(this.resultsUrl);
  }
}
