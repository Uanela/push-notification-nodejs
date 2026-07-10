import { ArkosRouter } from "arkos";
import { RouteHook } from "arkos";

export const hook: RouteHook<"prisma"> = {};

const pushSubscriptionRouter = ArkosRouter({
  openapi: { tags: ["Push Subscriptions"] },
});

pushSubscriptionRouter.get({ path: "/vapid-public-key" }, (_req, res) => {
  res.json({ key: process.env.VAPID_PUBLIC_KEY });
});

export default pushSubscriptionRouter;
