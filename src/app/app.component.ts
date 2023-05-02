import { Component, OnInit, Optional } from "@angular/core";
import { Messaging, getToken, onMessage } from "@angular/fire/messaging";
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
	token$: Observable<any> = EMPTY;
	message$: Observable<any> = EMPTY;
	showRequest = false;

	constructor(
		private _messaging: Messaging,
		private _notificationService: NotificationService,
		private _snackBar: MatSnackBar,
		private _swUpdate: SwUpdate
	) {}

	ngOnInit() {
		if (this._swUpdate.isEnabled) {
			this._swUpdate.versionUpdates
				.pipe(filter((evt): evt is VersionReadyEvent => evt.type === "VERSION_READY"))
				.subscribe(() => {
					const ref = this._snackBar.open("Newer version of the app is available!", "UPDATE", { duration: 2000 });
					ref.onAction().subscribe(() => document.location.reload());
				});
		}
		console.log("messaging", this._messaging);
		if (this._messaging) {
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
			this.message$ = new Observable(sub => onMessage(this._messaging, it => sub.next(it))).pipe(
				tap(token => console.log("FCM", { token }))
			);
			this.message$.subscribe(x => this._snackBar.open(x.notification.body, undefined, { duration: 3000 }));
		}
	}
}
