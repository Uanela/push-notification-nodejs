import { ArkosNextFunction, ArkosRequest, ArkosResponse } from "arkos";
import { BaseController } from "arkos/controllers";

export class PushSubscriptionController extends BaseController {
  async beforeCreateOne(
    req: ArkosRequest,
    _res: ArkosResponse,
    next: ArkosNextFunction
  ) {
    req.body = {
      ...req.body,
      user: { id: req.user!.id },
    };

    next();
  }
}

const pushSubscriptionController = new PushSubscriptionController(
  "push-subscription"
);

export default pushSubscriptionController;
