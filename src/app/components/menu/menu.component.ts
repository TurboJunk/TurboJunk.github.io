import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";
import { PwaService } from "src/app/services/pwa.service";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
	currentTheme = "indigo-pink";
	theme = "indigo-pink";
	pushMessage = "Test notification";
	isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
		map(result => result.matches),
		shareReplay()
	);

	constructor(private breakpointObserver: BreakpointObserver, private _notificationService: NotificationService, private _pwaService:PwaService) {
		document.body.classList.add(this.theme);
	}
	ngOnInit(): void {
		if (this.breakpointObserver.isMatched("(prefers-color-scheme: dark)")) {
			this.theme = "purple-green";
			this.themeChange();
		}
	}

	themeChange(): void {
		document.body.classList.remove(this.currentTheme);
		this.currentTheme = this.theme;
		document.body.classList.add(this.theme);
	}

	notify(): void {
		this._notificationService.send(this.pushMessage);
	}

  install(): void {
    this._pwaService.initPwaPrompt();
  }
}
