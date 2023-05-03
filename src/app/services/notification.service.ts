import { Injectable } from "@angular/core";
import { MessagePayload } from "@angular/fire/messaging";

@Injectable({
	providedIn: "root",
})
export class NotificationService {

	constructor() {}

	requestPermission(): Promise<NotificationPermission> {
		return Notification.requestPermission();
	}

	generateNotification(sw: ServiceWorkerRegistration, source: MessagePayload): void {
		sw.showNotification(source.notification!.title!, {
			body: source.notification?.body,
			icon: source.notification?.image,
		});
	}
}
