import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
	isHandset$: Observable<boolean> = this._breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
		map(result => result.matches),
		shareReplay()
	);

	constructor(
		private _breakpointObserver: BreakpointObserver,
	) {}
}
