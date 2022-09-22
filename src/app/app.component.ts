import { Component, OnInit, Optional } from "@angular/core";
import { Messaging, getToken, onMessage } from "@angular/fire/messaging";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, from, Observable } from "rxjs";
import { share, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { NotificationService } from "./services/notification.service";

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
		@Optional() messaging: Messaging,
		notificationService: NotificationService,
		private _snackBar: MatSnackBar
	) {
		console.log("messaging", messaging);
		if (messaging) {
			navigator.serviceWorker
				.register("firebase-messaging-sw.js", { type: "module", scope: "__" })
				.then(serviceWorkerRegistration =>
					getToken(messaging, {
						serviceWorkerRegistration,
						vapidKey: environment.firebase.vapidKey,
					}).then(token => {
						console.log("FCM", { token });
						notificationService.fcmkey = token;
					})
				);
			// this.token$ = from(
			// 	navigator.serviceWorker
			// 		.register("firebase-messaging-sw.js", { type: "module", scope: "__" })
			// 		.then(serviceWorkerRegistration =>
			// 			getToken(messaging, {
			// 				serviceWorkerRegistration,
			// 				vapidKey: environment.firebase.vapidKey,
			// 			})
			// 		)
			// ).pipe(
			// 	tap(token => {
			// 		console.log("FCM", { token });
			// 		_notificationService.fcmkey = token;
			// 	}),
			// 	share()
			// );
			this.message$ = new Observable(sub => onMessage(messaging, it => sub.next(it))).pipe(
				tap(token => console.log("FCM", { token }))
			);
			this.message$.subscribe(x => this._snackBar.open(x.notification.body, undefined, { duration: 3000 }));
		}
	}
}
