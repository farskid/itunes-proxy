import jQuery from  "jquery";
import expose from './expose';

const app = {
  init() {
    console.info('App initialized');
  }
};

expose(
  [
    {$: jQuery},
    {app}
  ]
);

export default app;