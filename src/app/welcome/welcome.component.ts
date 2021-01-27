import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WelcomeDataService, WelcomeMessage} from '../service/data/welcome-data.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Some Welcome Message';
  name = '';
  welcomeMessageFromService: string;

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) {

  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
  }

  handleWelcomeMessage(): void {
    this.welcomeDataService.executeHelloWorldService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleWelcomeMessageWithParam(): void {
    this.welcomeDataService.executeHelloWorldWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response: WelcomeMessage): void {
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error: HttpErrorResponse): void {
    this.welcomeMessageFromService = error.error.message;
  }

}
