# AGENTS

## Scope

These instructions apply across the repository. Use the scoped instruction files for CSS and tests when they match the files you are editing:

- See [.github/instructions/css.instructions.md](.github/instructions/css.instructions.md) for stylesheet work.
- See [.github/instructions/unittesting.instructions.md](.github/instructions/unittesting.instructions.md) for test files.

## Project Shape

- This is a static educational site built with `index.html`, split CSS files under `assets/css/`, and vanilla ES modules under `js/`.
- `js/main.js` is the runtime entry point and wires feature initializers together.
- `script.js` is still imported by `js/main.js` and owns legacy example-data and modal behavior.

## Working Conventions

- Keep static content in `index.html` unless there is a clear behavior or rendering reason to generate it with JavaScript.
- Add interactive behavior in the closest `js/features/*.js` module and keep `js/main.js` limited to initialization.
- Match the current defensive browser style: if required DOM nodes are missing, exit early instead of throwing.
- Preserve the existing visual language and split CSS by concern instead of adding new ad hoc structure.

## Validation

- Run `npm test` after changing behavior or tests.
- For manual smoke testing, serve the repo as a static site, for example with `python -m http.server 8000`.

## Project Pitfalls

- Prefer the live file structure over the README when they disagree; some README paths are stale.
- Treat this repo as a static site first. The current package scripts are not a complete app build workflow.

## Recent Site Updates

- Added top-level navigation links for `Instructions`, `Prompts`, and `Hooks` in `index.html`.
- Added dedicated `Prompts` and `Hooks` sections with reusable templates and automation examples.
- Updated footer quick links to surface these new sections for easier discovery.
