# tasks

This project is a Node/Express app using ES modules and Mongoose.

Build & run (produce a dist for deployment):

1. Install dependencies:

   npm install

2. Build a production bundle (uses esbuild):

   npm run build

   This creates `dist/index.js` (note: `express` and `mongoose` are left as externals and must be installed on the host).

3. Start the bundled app:

   npm run start:dist

Notes:

- The DB connection string is committed in `database/database.js`. Replace it with an environment variable for production.
- `esbuild` is a devDependency used to produce the dist. The bundle excludes `express` and `mongoose` (they remain external) so the target environment must have them installed.

API documentation: see `API.md` for endpoints, request examples, and response shapes.

## CORS

- The app supports configuring allowed origins via the `CORS_ALLOW_ORIGIN` environment variable (comma-separated). If not set, CORS allows all origins for browser requests.
- Example: `CORS_ALLOW_ORIGIN=https://example.com,https://app.example.com`
