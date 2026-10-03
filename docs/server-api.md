# Server integration boundary

The old API handlers modified an unauthenticated, volatile in-memory seed and the old login handler did not validate passwords. They have been disabled with explicit HTTP 501 responses. The existing browser-local workspace remains operational; its records stay in local storage and can be exported. It does not promise cross-device synchronization or server authentication.

OAuth is disabled by default. To deliberately configure Hugging Face OAuth, set server-only HF_CLIENT_ID, HF_CLIENT_SECRET, AUTH_SECRET, and rebuild with NEXT_PUBLIC_OAUTH_ENABLED=true. A durable database and authorization layer are required before replacing the disabled data API handlers. Never store provider secrets in client-side environment variables.
