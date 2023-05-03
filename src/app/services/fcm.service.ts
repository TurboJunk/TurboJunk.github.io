import { Injectable } from "@angular/core";
import { MessagePayload, Messaging, getToken, onMessage } from "@angular/fire/messaging";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NotificationService } from "./notification.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class FCMService {
	fcmkey: string;

	constructor(
		private _messaging: Messaging,
		private _notificationService: NotificationService,
		private _http: HttpClient
	) {
		navigator.serviceWorker
			.register("firebase-messaging-sw.js", { type: "module", scope: "__" })
			.then(serviceWorkerRegistration =>
				getToken(this._messaging, {
					serviceWorkerRegistration,
					vapidKey: environment.firebase.vapidKey,
				}).then(token => {
					console.log("FCM", { token });
					this.fcmkey = token;
					Notification.requestPermission();
				})
			);
		new Observable<MessagePayload>(sub => onMessage(this._messaging, it => sub.next(it))).subscribe(x =>
			this._notificationService.generateNotification(x)
		);
	}

	send(str: string): void {
		this._http
			.post<any>(
				"https://fcm.googleapis.com/fcm/send",
				{
					to: this.fcmkey,
					notification: {
						title: str,
						body: str,
						image: "https://material.angular.io/assets/img/examples/shiba1.jpg",
					},
				},
				{
					headers: {
						Authorization:
							"key=AAAAVAW5oLU:APA91bGcK3DU1ADkFlBFnkS4ft-qoirQcKRgZk33rYLefOwN67I62thTS6kxjNRHtkcq0oxtAuYcFBRQcBWtwKjggPCbgGg8jeKI2k76KjbWfUcMFFbI5PfYHGEzbVB8ZpA-AJVWrn2B",
					},
				}
			)
			.subscribe(x => {
				console.log("FCM Send response");
				console.log(x);
			});
	}
}
