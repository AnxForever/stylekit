export type CheckoutConfigurationEnvironment = Record<string, string | undefined>;

/**
 * A provider SDK key is not enough to claim that StyleKit has an auditable
 * checkout path. This explicit marker is shared by the admin API and local
 * readiness check until a real provider adapter is implemented.
 */
export function isPackCheckoutConfigured(
  environment: CheckoutConfigurationEnvironment = process.env,
): boolean {
  return Boolean(environment.PACK_CHECKOUT_PROVIDER?.trim());
}
