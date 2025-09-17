# MultiTheFranky

Production: https://multithefranky.com

This site is built with Astro and React.

## Project Structure

Inside the project you'll find:
- `public/` - static assets such as `favicon.svg`
- `src/components/` - shared UI components
- `src/layouts/` - layout shells for pages
- `src/pages/` - route files rendered by Astro
- `package.json` - project metadata and scripts

Any static asset placed in `public/` is served at the root URL. Files in `src/pages/` become routes based on their file name.

## Commands

Run all commands from the project root:

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm test` | Run the full test suite |
| `pnpm lint` | Lint the project |
| `pnpm format` | Format source files |

## Tooling

The project uses pnpm for dependency management and Husky hooks for basic Git hygiene.

## Deployment

The build expects Node.js 22.19.0 or newer. If you deploy to Cloudflare Pages, set the project variable `NODE_VERSION` to `22.19.0` (or rely on the `.nvmrc` file in the repository root) so the build uses a supported runtime. Running `pnpm env use --global 22.19.0` locally keeps development in sync.

## License

Licensed under the MIT License.
