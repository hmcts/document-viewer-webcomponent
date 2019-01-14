import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, Event} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'EM Annotation WebApp';
    logoutLink: string;

    constructor(private router: Router, private authService: AuthService) {
        this.logoutLink = `/logout?redirect=${encodeURIComponent(this.authService.generateLoginUrl())}`;
    }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const replacedTitles = this.replacedTitles(event.url);
                this.title = this.getTitle(replacedTitles);
            }
        });
    }

    private replacedTitles(url: string): string {
        if (url.indexOf('summary') !== -1) {
            return 'summary';
        }
        if (url.indexOf('parties') !== -1) {
            return 'parties';
        }
        return '/';
    }

    private getTitle(key): string {
       const titleMapping: {[id: string]: string} = {
           '/' : this.title
       };

       return titleMapping[key];
    }
}
