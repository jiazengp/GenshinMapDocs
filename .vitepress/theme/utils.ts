export const freeGlobal =
  typeof global === 'object' &&
  global !== null &&
  global.Object === Object &&
  global

/** Detect free variable `globalThis` */
export const freeGlobalThis =
  typeof globalThis === 'object' &&
  globalThis !== null &&
  globalThis.Object == Object &&
  globalThis

/** Detect free variable `self`. */
export const freeSelf =
  typeof self === 'object' && self !== null && self.Object === Object && self

export const root =
  freeGlobalThis || freeGlobal || freeSelf || Function('return this')()
/**
 * @see https://spec.commonmark.org/0.29/#line-ending
 */
export const NEWLINES_RE = /\r\n?|\n/g

// single quote will break @vue/compiler-sfc
export const stringifyProp = (data: unknown): string =>
  JSON.stringify(data).replace(/'/g, '&#39')

export const escapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;')
    .replace(/'/gu, '&#039;')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
// eslint-disable-next-line
export const isFunction = <T extends Function>(val: any): val is T =>
  typeof val === 'function'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp
/* String helper */

export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix)

export const endsWith = (str: unknown, suffix: string): boolean =>
  isString(str) && str.endsWith(suffix)

/**
 * Check if a value is plain object, with generic type support
 */
export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown,
): val is T => Object.prototype.toString.call(val) === '[object Object]'

const markdownLinkRegexp = /.md((\?|#).*)?$/

/**
 * Determine a link is http link or not
 *
 * - http://github.com
 * - https://github.com
 * - //github.com
 */
export const isLinkHttp = (link: string): boolean =>
  /^(https?:)?\/\//.test(link)

/**
 * Determine a link is ftp link or not
 */
export const isLinkFtp = (link: string): boolean => link.startsWith('ftp://')

/**
 * Determine a link is external or not
 */
export const isLinkExternal = (link: string, base = '/'): boolean => {
  // http link or ftp link
  if (isLinkHttp(link) || isLinkFtp(link)) {
    return true
  }

  // absolute link that does not start with `base` and does not end with `.md`
  if (
    link.startsWith('/') &&
    !link.startsWith(base) &&
    !markdownLinkRegexp.test(link)
  ) {
    return true
  }

  return false
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
/* Object helper */

export const { entries } = Object
export const { fromEntries } = Object
export const { keys } = Object
export const { values } = Object

function debounce(func, wait, options) {
  let lastArgs
  let lastThis
  let maxWait
  let result
  let timerId
  let lastCallTime

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function'

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}

export default debounce

export const isRelativeLink = (link: string) =>
  /^(?!www\.|http[s]?:\/\/|[A-Za-z]:\\|\/\/).*/.test(link)

const concatLink = (link: string, base: string): string =>
  `/${base}/${link}`.replace(/\/+/giu, '/')

const modifyLink = (obj: any, base: string): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => modifyLink(item, base))
  }
  if (isObject(obj)) {
    const newObj = {}
    for (const key in obj) {
      if (Array.isArray(obj[key]) || typeof obj[key] === 'object') {
        newObj[key] = modifyLink(obj[key], base)
      } else if (key === 'link' && isRelativeLink(obj[key])) {
        newObj[key] = concatLink(obj[key], base)
        if (isLinkExternal(obj[key])) newObj.target = '_blank'
      } else {
        newObj[key] = obj[key]
      }
    }
    return newObj
  }
  return obj
}

const modifyKey = (obj: any, base: string) => {
  const newObj = {}
  for (const key in obj) {
    if (key.startsWith('/') && base !== '') {
      const newKey = concatLink(key, base)
      newObj[newKey] = obj[key]
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

export const baseHelper = (obj: any, base: string): any =>
  modifyKey(modifyLink(obj, base), base)

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
export function copyArray(source, array) {
  let index = -1
  const { length } = source

  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

export const hash = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash &= hash // Convert to 32bit integer
  }
  return hash
}

export function camelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export const loadFont = (family: string, url: string) => {
  // 创建自定义字体对象
  const font = new FontFace(family, `url(${url})`, { display: 'swap' })

  // @ts-ignore
  document.fonts.add(font)

  font
    .load()
    .then(() => {
      document.documentElement.classList.add('font-full')
      console.log(`Font ${family} loaded successfully.`)
    })
    .catch((err) => {
      console.error(`Failed to load font ${family}: ${err}`)
    })
}

export function removeQueryParam(param: string) {
  const urlObj = new URL(location.href)
  urlObj.searchParams.delete(param)
  const url = urlObj.toString()
  window.history.replaceState({}, '', url)
  return url
}
