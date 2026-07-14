---
description: "Use when writing or updating Vitest test files for this static site. Covers jsdom setup, module-to-test mapping, and defensive DOM test patterns."
name: "Vitest Testing Standards"
applyTo: '**/*.test.js'
---

# Vitest Testing Standards

- Use Vitest APIs from `vitest`; this project already runs tests in `jsdom` through `vitest.config.js`.
- Mirror the production structure: feature behavior in `js/features/*.js` should be tested in `tests/features/*.test.js` with aligned naming.
- Build tests around DOM setup plus observable behavior such as class changes, inline styles, emitted text, or calls to browser APIs like `scrollTo` and `navigator.clipboard`.
- Preserve the project’s defensive behavior by testing both the normal path and the no-op path when required elements are missing.
- Keep tests isolated. Rely on `tests/setup.js` for DOM cleanup, spy restoration, and timer reset instead of carrying state between tests.
- Maintain at least the current coverage expectation of 80% lines, functions, branches, and statements for `js/features/**/*.js`.
