import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanEligibilityService } from '../../services/loan-eligibility.service';

@Component({
  selector: 'app-loan-application-form',
  templateUrl: './loan-application-form.component.html',
  styleUrls: ['./loan-application-form.component.css']
})
export class LoanApplicationFormComponent {

  loanApplication = {
    gender: '',
    married: '',
    dependents: 0,
    education: '',
    selfEmployed: '',
    applicantIncome: 0,
    coapplicantIncome: 0,
    loanAmount: 0,
    loanTerm: 360, // Default to 360 months
    creditHistory: 1, // Default to good credit history
    propertyArea: ''
  };

  constructor(private loanEligibilityService: LoanEligibilityService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loanEligibilityService.submitApplication(this.loanApplication)
        .subscribe({
          next: (response) => console.log('Loan Application Response:', response),
          error: (error) => console.error('Error submitting loan application:', error)
        });
    }
  }
}
