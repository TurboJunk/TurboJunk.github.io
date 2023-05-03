import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessagePayload } from "@angular/fire/messaging";
import { SwPush } from "@angular/service-worker";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	//constructor(private _swPush: SwPush) {}

	// subscribeToNotifications() {

    //     this._swPush.requestSubscription({
    //         serverPublicKey: environment.firebase.vapidKey
    //     })
    //     .then(sub => this.test(sub))
    //     .catch(err => console.error("Could not subscribe to notifications", err));
    // }

	// test(sub: PushSubscription): void {
	// 	console.log(sub)
	// }

	// Notifications API

	permission: Permission;
	isSupported() {
		return "Notification" in window;
	}

	constructor() {
		this.permission = this.isSupported() ? Notification.permission : "denied";
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
