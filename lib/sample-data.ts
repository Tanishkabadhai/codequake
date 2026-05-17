export const sampleDiff = `diff --git a/src/auth/session.ts b/src/auth/session.ts
@@ -18,7 +18,7 @@ export function validateSession(token: string) {
-  return verifyToken(token);
+  return verifyToken(token, { strictAudience: true });
}

diff --git a/src/api/payments/checkout.ts b/src/api/payments/checkout.ts
@@ -33,6 +33,9 @@ export async function createCheckoutSession(req) {
+  await auditSession(req.user.sessionId);
   return paymentProvider.create(req.body);
}`;

export const bobInsightTemplate = `IBM Bob repository-wide architecture reasoning:
- Architecture: Next.js app with API modules, authentication middleware, payment checkout flow, and shared session utilities.
- Critical modules: src/auth/session.ts, src/middleware.ts, src/api/payments/checkout.ts, src/lib/audit.ts.
- Dependency topology: Session validation is reused by middleware, account routes, payment APIs, admin dashboards, and audit logging.
- Fault zone: Authentication is tightly coupled to checkout and shared middleware, creating propagation amplification risk.
- Cascade risk: A stricter session audience check can travel into revenue-critical payment paths and route authorization.
- Test focus: auth middleware, payment checkout, session validation, route authorization, audit logging.`;
