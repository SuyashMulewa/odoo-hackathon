# AssetNexsus

AssetNexsus is a component-based asset management interface with a local authentication API.

## Run locally

```powershell
npm.cmd run dev
```

This starts both the Vite client and the API at `http://localhost:4000`. The Vite development server proxies `/api` calls to that API.

## Authentication API

- `POST /api/auth/register` — creates an Employee account only (`name`, `email`, `password`)
- `POST /api/auth/login` — sign in (`email`, `password`, `remember`)
- `GET /api/auth/me` — restore a session using `Authorization: Bearer <token>`
- `POST /api/auth/forgot-password` and `/api/auth/reset-password` — password recovery
- `GET /api/admin/employees` and `PATCH /api/admin/employees/:id/role` — admin-only Employee Directory and promotion endpoints

Passwords are hashed with Node's `scrypt`. Local development users are kept in `server/data/db.json`; production should use a database, email service, HTTPS-only cookies, rate limiting, and a secure `JWT_SECRET` environment variable.
