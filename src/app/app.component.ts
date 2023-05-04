import { Component, OnInit, Optional } from "@angular/core";
import { MessagePayload, Messaging, getToken, onMessage } from "@angular/fire/messaging";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, from, Observable } from "rxjs";
import { distinctUntilChanged, filter, share, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NotificationService } from "./services/notification.service";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	showRequest = false;

	constructor(private _snackBar: MatSnackBar, private _swUpdate: SwUpdate) {}

	ngOnInit() {
		if (this._swUpdate.isEnabled) {
			this._swUpdate.versionUpdates
				.pipe(
					filter((evt): evt is VersionReadyEvent => evt.type === "VERSION_READY"),
					distinctUntilChanged()
				)
				.subscribe(() =>
					this._snackBar
						.open("Newer version of the app is available!", "UPDATE", { duration: 5000 })
						.onAction()
						.subscribe(() => document.location.reload())
				);
		}
	}
}
