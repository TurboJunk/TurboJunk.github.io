import { Component, OnInit, Optional } from "@angular/core";
import { MessagePayload, Messaging, getToken, onMessage } from "@angular/fire/messaging";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, from, Observable } from "rxjs";
import { filter, share, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NotificationService } from "./services/notification.service";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	token$: Observable<string> = EMPTY;
	message$: Observable<MessagePayload> = EMPTY;
	showRequest = false;

	constructor(
		private _messaging: Messaging,
		private _notificationService: NotificationService,
		private _snackBar: MatSnackBar,
		private _swUpdate: SwUpdate
	) {
		navigator.serviceWorker
			.register("firebase-messaging-sw.js", { type: "module", scope: "__" })
			.then(serviceWorkerRegistration =>
				getToken(this._messaging, {
					serviceWorkerRegistration,
					vapidKey: environment.firebase.vapidKey,
				}).then(token => {
					console.log("FCM", { token });
					this._notificationService.fcmkey = token;
				})
			);
	}

	ngOnInit() {
		if (this._swUpdate.isEnabled) {
			this._swUpdate.versionUpdates
				.pipe(filter((evt): evt is VersionReadyEvent => evt.type === "VERSION_READY"))
				.subscribe(() => {
					const ref = this._snackBar.open("Newer version of the app is available!", "UPDATE", { duration: 3000 });
					ref.onAction().subscribe(() => document.location.reload());
				});
		}
		this.message$ = new Observable<MessagePayload>(sub => onMessage(this._messaging, it => sub.next(it)));
		this.message$.subscribe(x => this._notificationService.generateNotification(x));
	}
}
