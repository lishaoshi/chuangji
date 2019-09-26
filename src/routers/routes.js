import NotFound from "../page/notFound";
import baseRoutes from "./base.js";
import signRoutes from "./sign.js";
import shopRoutes from "./shop.js";

import userRoutes from "./user.js";
import myRoutes from './my.js';
import companyRoutes from './company.js';
import platformRoutes from './platformManager.js';
import factoryExtensionRoutes from './platformManager.js';
import ExtensionRoutes from './extension.js';
import lianbei from "./lianbei.js";

const router = [
    { path: "", redirect: "/home"},

    ...baseRoutes,
    ...signRoutes,
    ...myRoutes,
    ...companyRoutes,
    ...platformRoutes,

    ...userRoutes,
	...shopRoutes,
	...factoryExtensionRoutes,
    ...lianbei,
    ...ExtensionRoutes,
    { path: "*", component: NotFound }/* 404 */
];


export default router;