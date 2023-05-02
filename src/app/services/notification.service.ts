import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessagePayload } from "@angular/fire/messaging";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	fcmkey = "";
	permission: Permission;
	isSupported() {
		return "Notification" in window;
	}

	constructor(private _http: HttpClient) {
		this.permission = this.isSupported() ? Notification.permission : "denied";
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
				console.log("FCM Send responce");
				console.log(x);
			});
	}

	requestPermission() {
		if ("Notification" in window) {
			Notification.requestPermission((status: any) => (this.permission = status));
		}
	}

	create(title: string, options?: PushNotification): any {
		return new Observable((obs: any) => {
			if (!("Notification" in window)) {
				obs.error("Notifications are not available in this environment");
				obs.complete();
			}

			if (this.permission !== "granted") {
				obs.error(`The user hasn't granted you permission to send push notifications`);
				obs.complete();
			}

			const n = new Notification(title, options);

			n.onshow = (e: any) => obs.next({ notification: n, event: e });
			n.onclick = (e: any) => obs.next({ notification: n, event: e });
			n.onerror = (e: any) => obs.error({ notification: n, event: e });
			n.onclose = () => obs.complete();
		});
	}

	generateNotification(source: MessagePayload): void {
		this.create(source.notification!.title!, {
			body: source.notification?.body,
			icon: source.notification?.image,
		}).subscribe();
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
