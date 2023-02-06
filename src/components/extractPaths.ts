import {
  ExtendedRouteElement,
  isElementRouteProps,
  isIndexRouteProps,
  isRouteParentProps,
  RoutePropsObject,
} from '../types'
/**
 * Gets path from route elements
 * @param {ExtendedRouteElement} route - React Router Route element
 * @returns {Array<RoutePropsObject>} - Array of objects that contains path, category and title
 */

export function extractPaths(route: ExtendedRouteElement): Array<RoutePropsObject> {
  const { props } = route
  // if props has index set to true, return empty array
  if (isIndexRouteProps(props)) {
    return []
  }
  // if props has children, set pathPrefix to props.path, otherwise set it to empty string
  const pathPrefix = isRouteParentProps(props) ? `${props.path}` : ''
  // if props has element prop, return array with one object
  if (isElementRouteProps(props)) {
    // if path is equal to "/",  set it to empty string else, use path value and add "/" at the end
    let path = `${pathPrefix}/${props.path === '/' ? '' : `${props.path}/`}`
    // if path starts with "/", remove "/"
    if (path.startsWith('/')) path = path.slice(1)
    return [{ path: path, category: props.handle.category, title: props.handle.title }]
  }

  return (
    [
      { path: pathPrefix, category: props.handle?.category || '', title: props.handle?.title || '' },
      ...props.children
        // called recursively on all children
        .map(extractPaths)
        //  flatten array
        .flatMap((childPaths) =>
          // add pathPrefix to all paths
          childPaths.map((childPath) => ({
            path: `${pathPrefix}/${childPath.path}`,
            category: childPath.category,
            title: childPath.title,
          })),
        ),
    ]
      // remove values that do not contain property "title". This is used to remove initial <Route> element that wraps <routes>
      .filter(({ title }) => title)
  )
}
