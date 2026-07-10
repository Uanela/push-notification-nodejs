import { ArkosRouter } from "arkos";
import { RouteHook } from "arkos";
import notificationController from "./notification.controller";
import { NotifyUserDto } from "./dtos/notify-user.dto";

export const hook: RouteHook<"prisma"> = {};

const notificationRouter = ArkosRouter({
  openapi: { tags: ["Notifications"] },
});

notificationRouter.post(
  {
    path: "/notify",
    validation: {
      body: NotifyUserDto,
    },
  },
  notificationController.notify
);

export default notificationRouter;
