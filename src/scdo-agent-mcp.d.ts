declare module "scdo-agent-mcp/core" {
  export class ScdoAgent { constructor(o: any); [k: string]: any; }
  export class ScdoError extends Error { code: string; constructor(code: string, message: string); }
  export const CAPS: { minAtomic: any; maxAtomic: any; [k: string]: any };
  export function atomicToUsdc(a: any): string;
}
