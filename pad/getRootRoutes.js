import Thought from './page/Thought';
import Works from './page/Works';

export default () => ({
  path: '/',
  indexRoute: {
    component: Thought,
  },
  childRoutes: [
    {
      path: '/next',
      component: Works,
    },
  ],
});
