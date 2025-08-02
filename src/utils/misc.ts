// Will return whether the current environment is in a regular browser
// and not CEF
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEnvBrowser = (): boolean => !(window as any).cef

// Basic no operation function
export const noop = () => {}