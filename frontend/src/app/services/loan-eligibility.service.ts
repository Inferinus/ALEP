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
  
  // Temporarily remove applicationId parameter
  getEligibilityResults(): Observable<any> {
    // Temporarily use a fixed URL without applicationId
    const url = `${this.backendUrl}/eligibility-results`; // Adjusted URL
    return this.http.get(url);
  }
  // Remember to replace applicationId with the actual ID you use to reference loan applications.
  //getEligibilityResults(applicationId: string): Observable<any> {
    //const url = `${this.resultsUrl}/${applicationId}`;
    //return this.http.get(url);
  //}
  
}
