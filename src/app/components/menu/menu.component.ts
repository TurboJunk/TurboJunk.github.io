import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
	currentTheme = "indigo-pink";
	theme = "indigo-pink";
	pushMessage = "Test push notification";
	isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
		map(result => result.matches),
		shareReplay()
	);

	constructor(private breakpointObserver: BreakpointObserver, private _notificationService: NotificationService) {
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

	notify() {
		this._notificationService.send(this.pushMessage);
	}
}
