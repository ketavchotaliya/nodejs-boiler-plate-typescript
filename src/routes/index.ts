import { Application } from 'express';

import ProviderRoutes from './provider.route';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/provider', ProviderRoutes);
};
