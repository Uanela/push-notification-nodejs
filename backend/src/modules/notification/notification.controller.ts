import { ArkosRequest, ArkosResponse } from "arkos";
import { BaseController } from "arkos/controllers";
import notificationService from "./notification.service";
import { NotifyUserDto } from "./dtos/notify-user.dto";

export class NotificationController extends BaseController {
  async notify(req: ArkosRequest<any, any, NotifyUserDto>, res: ArkosResponse) {
    const { user, ...rest } = req.body;
    const notification = await notificationService.notifyUser(user.id, rest);

    res.json({ data: notification });
  }
}

const notificationController = new NotificationController("notification");

export default notificationController;
