/**
* Determines if the provided object is a navigation command.
* A navigation command is anything with a navigate method.
*
* @param obj The object to check.
*/
export function isNavigationCommand(obj: any): boolean {
  return obj && typeof obj.navigate === 'function';
}

/**
* Used during the activation lifecycle to cause a redirect.
*/
export class Redirect {
  constructor(url: string, options: any = {}) {
    this.url = url;
    this.options = Object.assign({ trigger: true, replace: true }, options);
    this.shouldContinueProcessing = false;
  }

  /**
  * Called by the activation system to set the child router.
  *
  * @param router The router.
  */
  setRouter(router: Router): void {
    this.router = router;
  }

  /**
  * Called by the navigation pipeline to navigate.
  *
  * @param appRouter The router to be redirected.
  */
  navigate(appRouter: Router): void {
    let navigatingRouter = this.options.useAppRouter ? appRouter : (this.router || appRouter);
    navigatingRouter.navigate(this.url, this.options);
  }
}

/**
* Used during the activation lifecycle to cause a redirect to a named route.
  * @param route The name of the route.
  * @param params The parameters to be sent to the activation method.
  * @param options The options to use for navigation.
*/
export class RedirectToRoute {
  constructor(route: string, params: any = {}, options: any = {}) {
    this.route = route;
    this.params = params;
    this.options = Object.assign({ trigger: true, replace: true }, options);
    this.shouldContinueProcessing = false;
  }

  /**
  * Called by the activation system to set the child router.
  *
  * @param router The router.
  */
  setRouter(router: Router): void {
    this.router = router;
  }

  /**
  * Called by the navigation pipeline to navigate.
  *
  * @param appRouter The router to be redirected.
  */
  navigate(appRouter: Router): void {
    let navigatingRouter = this.options.useAppRouter ? appRouter : (this.router || appRouter);
    navigatingRouter.navigateToRoute(this.route, this.params, this.options);
  }
}
