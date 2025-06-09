//-----------------------------------------------------------------------------------------------------------------------------------------------------
// build(scope): Commit for build/rebuild purpose
// chore(scope): Used for miscellaneous changes that don't affect the main codebase(configuring development tools, setting up project-specific settings)
// ci(scope): Changes to our CI configuration files and scripts
// docs(scope): Documentation only changes
// feat(scope): A new feature
// fix(scope): A bug fix
// perf(scope): A code change that improves performance
// refactor(scope): A code change that neither fixes a bug nor adds a feature
// style(scope): Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test(scope): Adding missing tests or correcting existing tests
// update(scope): Updates to the project's build process, CI configuration files, or other tools and libraries.
// wip(scope): Work in process
// revert(scope): Commit for reverting previous commit
// -----------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'https://commitlint.js.org/#/reference-rules',
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'feat', 'fix', 'docs', 'chore', 'style', 'refactor', 'ci', 'test', 'perf', 'update', 'wip', 'revert'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', ['lower-case', 'kebab-case']],
    'subject-empty': [2, 'never'],
  },
}
