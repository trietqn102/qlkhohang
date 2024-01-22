// routeConfig
import config from "~/config";

// Router change Pages
import Home from "~/pages/Home";
import DataWarehouse from "~/pages/DataWarehouse";
import Import from "~/pages/Import";
import Export from "~/pages/Export";
import { Login, User,ManagerUser } from "~/pages/Auth";

const publicRoutes = [
  { path: config.routes.notfound, component: Home },

  { path: config.routes.home, component: Home },
  { path: config.routes.dataWarehouse, component: DataWarehouse },
  { path: config.routes.import, component: Import },
  { path: config.routes.export, component: Export },

  { path: config.routes.user, component: User },
  { path: config.routes.managerUser, component: ManagerUser },
  { path: config.routes.login, component: Login, Layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
