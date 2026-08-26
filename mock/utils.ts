const DEFAULT_SLEEP_MS = 1500

const sleep = <T = void>({
  ms,
  signal,
  callback,
  value,
}: { ms?: number; signal?: AbortSignal; callback?: () => T; value?: T } = {}) =>
  new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (callback) callback()
      resolve(value as unknown as T)
    }, ms ?? DEFAULT_SLEEP_MS)
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeout)
        reject(new Error('Sleep aborted'))
      })
    }
  })

export { sleep }
