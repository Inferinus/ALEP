import { Component, OnInit } from '@angular/core';
import { LoanEligibilityService } from '../../services/loan-eligibility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eligibilityResult: any = null;

  constructor(private loanEligibilityService: LoanEligibilityService) { }

  ngOnInit(): void {
    this.fetchEligibilityResults();
  }

  fetchEligibilityResults(): void {
    // Assuming you have an endpoint to fetch the eligibility results
    this.loanEligibilityService.getEligibilityResults()
      .subscribe({
        next: (result) => {
          this.eligibilityResult = result;
        },
        error: (error) => console.error('Error fetching eligibility results:', error)
      });
  }
}
