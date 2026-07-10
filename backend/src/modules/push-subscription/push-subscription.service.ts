import { BaseService } from "arkos/services";
  
export class PushSubscriptionService extends BaseService<"push-subscription"> {}

const pushSubscriptionService = new PushSubscriptionService("push-subscription");

export default pushSubscriptionService;
