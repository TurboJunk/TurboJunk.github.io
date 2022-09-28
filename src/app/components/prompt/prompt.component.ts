import { Component, Inject, OnInit } from "@angular/core";
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";

@Component({
	selector: "app-prompt",
	templateUrl: "./prompt.component.html",
	styleUrls: ["./prompt.component.scss"],
})
export class PromptComponent {
	constructor(
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: "ios" | "android"; promptEvent?: any },
		private _bottomSheetRef: MatBottomSheetRef<PromptComponent>
	) {}

	public installPwa(): void {
		this.data.promptEvent.prompt();
		this.close();
	}

	public close() {
		this._bottomSheetRef.dismiss();
	}
}
