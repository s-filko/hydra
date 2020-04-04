import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: '<app-layout></app-layout>',
})
export class AppComponent implements OnInit{
  title = 'Hydra?';


  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const child = this.activatedRoute.firstChild;

        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }

        return appTitle;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(ttl);
    });
  }
}
