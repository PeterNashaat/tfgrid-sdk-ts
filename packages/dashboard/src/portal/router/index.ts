import { RouteConfig } from "vue-router";

import WelcomeWindow from "@/other/views/WelcomeWindow.vue";
import AccountView from "@/portal/views/Account.vue";
import DaoView from "@/portal/views/Dao.vue";
import NodesView from "@/portal/views/Nodes.vue";
import SwapView from "@/portal/views/Swap.vue";
import TransferView from "@/portal/views/Transfer.vue";
import TwinView from "@/portal/views/Twin.vue";
export const portalRouter: RouteConfig[] = [
  {
    path: "/",
    name: "accounts",
    component: WelcomeWindow,
  },
  {
    path: "/:accountID",
    name: "account",
    component: AccountView,
  },
  {
    path: "/:accountID/account-twin",
    name: "account-twin",
    component: TwinView,
  },
  {
    path: "/:accountID/account-swap",
    name: "account-swap",
    component: SwapView,
  },
  {
    path: "/:accountID/account-transfer",
    name: "account-transfer",
    component: TransferView,
  },
  {
    path: "/:accountID/account-farms",
    name: "account-farms",
    component: () => import("../views/Farms.vue"),
  },
  {
    path: "/:accountID/account-dao",
    name: "account-dao",
    component: DaoView,
  },
  {
    path: "/:accountID/account-nodes",
    name: "account-nodes",
    component: NodesView,
  },
];
