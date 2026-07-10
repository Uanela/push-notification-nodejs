import { PushSubscription } from "@prisma/client";
import { BaseService } from "arkos/services";
import webpush from "web-push";
import pushSubscriptionService from "../push-subscription/push-subscription.service";

webpush.setVapidDetails(
  "mailto:uanela.como@superm7.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export class NotificationService extends BaseService<"notification"> {
  async sendWebPush(sub: PushSubscription, payload: object) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        JSON.stringify(payload)
      );
    } catch (err: any) {
      if (err.statusCode === 410 || err.statusCode === 404) {
        await pushSubscriptionService.deleteById(sub.id);
      }
    }
  }

  async notifyUser(
    userId: string,
    opts: { title: string; body: string; data?: object }
  ) {
    const notification = await this.createOne({ userId, ...opts });

    // in-app, only fires if user is connected
    // gateway.to(socket => socket.user()?.id === userId).emit("notification:new", notification);

    // browser push, fires regardless of connection
    const subs = await pushSubscriptionService.findMany({ userId });
    console.log(subs);
    await Promise.all(subs.map((sub) => this.sendWebPush(sub, opts)));

    return notification;
  }
}

const notificationService = new NotificationService("notification");

export default notificationService;
