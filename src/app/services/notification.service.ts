import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	constructor(private _http: HttpClient) {
		this.permission = this.isSupported() ? "default" : "denied";
	}
	fcmkey = "";

	send(str: string): void {
		this._http
			.post<string>(
				"https://fcm.googleapis.com/fcm/send",
				{
					to: this.fcmkey,
					notification: {
						body: str,
						subtitle: str,
						title: str,
					},
				},
				{
					headers: {
						Authorization:
							"key=AAAAVAW5oLU:APA91bGcK3DU1ADkFlBFnkS4ft-qoirQcKRgZk33rYLefOwN67I62thTS6kxjNRHtkcq0oxtAuYcFBRQcBWtwKjggPCbgGg8jeKI2k76KjbWfUcMFFbI5PfYHGEzbVB8ZpA-AJVWrn2B",
					},
				}
			)
			.subscribe();
	}

	public permission: Permission;
	public isSupported(): boolean {
		return "Notification" in window;
	}
	requestPermission(): void {
		let self = this;
		if ("Notification" in window) {
			Notification.requestPermission(function (status) {
				return (self.permission = status);
			});
		}
	}
	create(title: string, options?: PushNotification): any {
		let self = this;
		return new Observable(function (obs) {
			if (!("Notification" in window)) {
				console.log("Notifications are not available in this environment");
				obs.complete();
			}
			if (self.permission !== "granted") {
				console.log("The user hasn't granted you permission to send push notifications");
				obs.complete();
			}
			let _notify = new Notification(title, options);
			_notify.onshow = function (e) {
				return obs.next({
					notification: _notify,
					event: e,
				});
			};
			_notify.onclick = function (e) {
				return obs.next({
					notification: _notify,
					event: e,
				});
			};
			_notify.onerror = function (e) {
				return obs.error({
					notification: _notify,
					event: e,
				});
			};
			_notify.onclose = function () {
				return obs.complete();
			};
		});
	}
	generateNotification(source: any[]): void {
		source.forEach(item => {
			let options = {
				body: item.alertContent,
				icon: "https://material.angular.io/assets/img/examples/shiba1.jpg",
			};
			this.create(item.title, options).subscribe();
		});
	}
}
export declare type Permission = "denied" | "granted" | "default";
export interface PushNotification {
	body?: string;
	icon?: string;
	tag?: string;
	data?: any;
	renotify?: boolean;
	silent?: boolean;
	sound?: string;
	noscreen?: boolean;
	sticky?: boolean;
	dir?: "auto" | "ltr" | "rtl";
	lang?: string;
	vibrate?: number[];
}
