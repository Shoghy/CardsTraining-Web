import { router } from "expo-router";

export interface HrefObject{
  /** Path representing the selected route `/[id]`. */
  pathname?: string;
  /** Query parameters for the path. */
  params?: Record<string, number | string>;
}

export type Href = HrefObject | string;

const custom_router = {
  /** Go back in the history. */
  back(){
    router.back();
  },
  /** If there's history that supports invoking the dismiss and dismissAll function. */
  canDismiss(){
    return router.canDismiss();
  },
  /** If there's history that supports invoking the back function. */
  canGoBack(){
    return router.canGoBack();
  },
  /** Navigate to the provided href using a push operation if possible. */
  dismiss(count?: number){
    router.dismiss(count);
  },
  /** Navigate to first screen within the lowest stack */
  dismissAll(){
    router.dismissAll();
  },
  /** Navigate to the provided href. */
  navigate(href: Href){
    router.navigate(href);
  },
  /** Navigate to the provided href. */
  push(href: Href){
    router.push(href as never);
  },
  /** Navigate to route without appending to the history. */
  replace(href: Href){
    router.replace(href as never);
  },
  /** Update the current route query params. */
  setParams(params: Record<string, number | string>){
    router.setParams(params as never);
  }
};

export enum OrMode{
  Replace,
  Push,
  Navigate
}

export function GoBackOr(or: Href, orMode: OrMode = OrMode.Replace){
  if(custom_router.canGoBack()){
    custom_router.back();
    return;
  }

  switch(orMode){
    case OrMode.Replace:{
      custom_router.replace(or);
      break;
    }
    case OrMode.Navigate:{
      custom_router.navigate(or);
      break;
    }
    case OrMode.Push:{
      custom_router.push(or);
      break;
    }
  }
}

export default custom_router;