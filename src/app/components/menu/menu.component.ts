import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NotificationService } from "src/app/services/notification.service";
import { PwaService } from "src/app/services/pwa.service";
import { Theme, ThemeService } from "src/app/services/theme.service";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent {
	currentTheme = this._themeService.currentTheme;
	themes = this._themeService.themes;
	pushMessage = "Test notification";
	isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
		map(result => result.matches),
		shareReplay()
	);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private _notificationService: NotificationService,
		private _pwaService: PwaService,
		private _themeService: ThemeService
	) {}

	themeChange(theme: Theme): void {
		this._themeService.change(theme);
	}

	notify(): void {
		this._notificationService.send(this.pushMessage);
	}

	install(): void {
		this._pwaService.openPromt();
	}
}
