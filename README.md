# MultiTheFranky

Production: [https://multithefranky.com](https://multithefranky.com)

Usage of [Astro](https://astro.build) and [React](https://reactjs.org) to create my personal website.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                             |
| :-------------- | :--------------------------------- |
| `pnpm install`  | Installs dependencies              |
| `pnpm dev`      | Starts the development server      |
| `pnpm build`    | Builds your project for production |
| `pnpm test`     | Runs your test suite               |
| `pnpm prettier` | Formats your code                  |
| `pnpm lint`     | Lints your code                    |

## 🐕 Husky

This project uses [Husky](https://typicode.github.io/husky/#/) to run commands before committing and pushing.

## 📦 Dependencies

This project uses [pnpm](https://pnpm.io) to manage dependencies.

## 📝 License

This project is licensed under the [MIT License](./LICENSE).
