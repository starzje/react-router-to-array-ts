/** props handle objekta*/
export interface handlePropsType {
  category: string
  title: string
}

/** props of <Routes> element  */
export interface RoutesProps {
  children: Array<React.ReactElement>
  handle: handlePropsType
}

/** props of <Route> element which contains other <Route> elements */
export interface RouteParentProps {
  path: string
  children: Array<React.ReactElement>
  handle: handlePropsType
}

/** type guard that check are props of type RouteParentProps */
export const isRouteParentProps = (routeProps: ExtendedRouteProps): routeProps is RouteParentProps =>
  (routeProps as RouteParentProps).children !== undefined &&
  (routeProps as RouteParentProps).path !== undefined &&
  (routeProps as RouteParentProps).handle !== undefined

/** props of <Route> element which has element prop */
export interface ElementRouteProps {
  path: string
  element: React.ReactElement
  handle: handlePropsType
}

/** type guard that check if props are type of ElementRouteProps */
export const isElementRouteProps = (routeProps: ExtendedRouteProps): routeProps is ElementRouteProps =>
  (routeProps as ElementRouteProps).element !== undefined && (routeProps as IndexRouteProps).index === undefined

/** props of <Route> element that has index set to true (and doesnt have "path") */
export interface IndexRouteProps {
  index: true
  element: React.ReactElement
}

/** type guard that checks if props are of type IndexRouteProps */
export const isIndexRouteProps = (routeProps: ExtendedRouteProps): routeProps is IndexRouteProps =>
  (routeProps as IndexRouteProps).index === true

/** Props of all route types */
export type ExtendedRouteProps = RoutesProps | RouteParentProps | IndexRouteProps | ElementRouteProps

/** React Router Route element */
export interface ExtendedRouteElement extends React.ReactElement {
  props: ExtendedRouteProps
}

/** type for Object that is created from extractPaths() function*/
export interface RoutePropsObject extends handlePropsType {
  path: string
}
