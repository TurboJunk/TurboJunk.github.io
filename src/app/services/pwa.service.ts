import { BreakpointObserver } from "@angular/cdk/layout";
import { Platform } from "@angular/cdk/platform";
import { Injectable } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { take, timer } from "rxjs";
import { PromptComponent } from "../components/prompt/prompt.component";

@Injectable({
	providedIn: "root",
})
export class PwaService {
	private promptEvent: any;

	constructor(
		private _bottomSheet: MatBottomSheet,
		private _platform: Platform,
		private _breakpointObserver: BreakpointObserver
	) {}

	public initPwaPrompt() {
		if (this._platform.ANDROID) {
			window.addEventListener("beforeinstallprompt", (event: any) => {
				event.preventDefault();
				this.promptEvent = event;
				this.openPromptComponent("android");
			});
		}
		if (this._platform.IOS) {
			const isInStandaloneMode = this._breakpointObserver.isMatched("(display-mode: standalone)");
			if (!isInStandaloneMode) {
				this.openPromptComponent("ios");
			}
		}
	}

	private openPromptComponent(mobileType: "ios" | "android") {
		this._bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
	}
}
