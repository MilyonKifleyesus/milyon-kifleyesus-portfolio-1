<!-- d4cac615-97b4-4ceb-b158-98fc8cd0dc00 39a60f25-2b2c-4b13-a5b6-3dbe28395efa -->
# Fix 401 on Admin Messages

- **Overview**: Align the admin token used by the API and the client, and ensure the token is available before triggering data fetches.

### Steps

1) Configure a single source of truth for the token

- Create `.env.local` with `ADMIN_TOKEN` and `NEXT_PUBLIC_ADMIN_TOKEN` using the same value (e.g., `admin-secure-token-123`).
- Rationale: Server reads `ADMIN_TOKEN`; client can read only `NEXT_PUBLIC_*` vars at build time.

2) Make server accept configured token

- In `src/app/api/admin/messages/route.ts`, update `isAuthenticated` to read `process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-secure-token-123'`.
- Minimal snippet:
```startLine:endLine:src/app/api/admin/messages/route.ts
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const expectedToken =
    process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "admin-secure-token-123";
  return authHeader === `Bearer ${expectedToken}`;
}
```


3) Ensure client always has the token and sends it consistently

- In `src/components/AdminDashboard.tsx`, derive `const defaultToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-secure-token-123';` at module scope.
- In component, compute `const token = (typeof window !== 'undefined' && localStorage.getItem('adminToken')) || defaultToken;`.
- Use `useEffect(() => { if (token) fetchMessages(); }, [token]);` and remove early returns that block fetch when token is falsy.
- Ensure all requests (GET/PUT/DELETE) use this `token` variable.

4) Add graceful handling if unauthorized

- If a fetch returns 401, show a short UI message: "Session expired – please log in" and navigate to `/admin` login or prompt to re-enter.

5) Quick manual workaround (optional, for current session)

- In browser console: `localStorage.setItem('adminToken', 'admin-secure-token-123');` then refresh `/admin`.

6) Verify end-to-end

- Reload `/admin` → should fetch messages (200 OK).
- Toggle read/replied and delete → should succeed.
- Hard refresh to confirm token persistence.

### To-dos

- [ ] Add ADMIN_TOKEN and NEXT_PUBLIC_ADMIN_TOKEN to .env.local
- [ ] Update isAuthenticated to accept ADMIN_TOKEN or NEXT_PUBLIC version
- [ ] Use NEXT_PUBLIC_ADMIN_TOKEN fallback and unify token reads
- [ ] Trigger fetchMessages only after token is available
- [ ] Show message and redirect to login on Unauthorized
- [ ] Manual test GET/PUT/DELETE and refresh behavior