export function injectEnv(extra?: Record<string, string>) {

  const defaults = {
    OFFERS_MICROSERVICE_PORT: 3001,
    CONTRACTS_MICROSERVICE_PORT: 3002,
  }

  Object.assign(process.env, defaults, extra)
}
