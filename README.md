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
