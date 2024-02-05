/**
 * Normalize the given path to the final route path
 */
export const normalizeRoutePath = (path: string): string => {
  // split pathname and query/hash
  const [pathname, ...rest] = path.split(/(\?|#)/)

  // if the pathname is empty or ends with `/`, return as is
  if (!pathname || pathname.endsWith('/')) return path

  // join query and hash
  const queryAndHash = rest.length > 0 ? rest.join('') : ''

  // convert README.md to index.html
  let routePath = pathname.replace(/(^|\/)README.md$/i, '$1index.html')

  // convert /foo/bar.md to /foo/bar.html
  if (routePath.endsWith('.md')) {
    routePath = routePath.substring(0, routePath.length - 3) + '.html'
  }
  // convert /foo/bar to /foo/bar.html
  else if (!routePath.endsWith('.html')) {
    routePath = routePath + '.html'
  }

  // convert /foo/index.html to /foo/
  if (routePath.endsWith('/index.html')) {
    return routePath.substring(0, routePath.length - 10) + queryAndHash
  }

  return routePath + queryAndHash
}
