import { Platform } from "@angular/cdk/platform";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { PromptComponent } from "../components/prompt/prompt.component";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class PwaService {
	private promptEvent: any;

	constructor(
		private _bottomSheet: MatBottomSheet,
		private _platform: Platform,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

	initPwaPrompt() {
		if (isPlatformBrowser(this.platformId)) window.addEventListener("beforeinstallprompt", (event: any) => {
			this.promptEvent = event;
		});
	}

	openPromt() {
		if (this._platform.BLINK || this._platform.ANDROID) this.openPromptComponent("android");

		else if (this._platform.SAFARI) this.openPromptComponent("ios");
	}

	private openPromptComponent(mobileType: "ios" | "android") {
		this._bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } });
	}
}
