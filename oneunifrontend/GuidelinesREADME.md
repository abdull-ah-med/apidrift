# ONEUNI FRONTEND TEAM WORKFLOW GUIDE

 Follow these steps carefully so we all stay aligned.

## STEP 1  Clone the repo

```bash
git clone https://github.com/your-username/OneUniFrontend.git
cd OneUniFrontend
git checkout dev
```

## STEP 2  Create your own branch

Always branch from `dev`, never from `main`.

```bash
git checkout -b feature/login
```

 Branch Naming Rules:

- `feature/featureName`  For new features
- `fix/issueName`  For fixing bugs
- `docs/readmeUpdate`  For documentation or readme

Examples:

- `feature/signup-ui`
- `fix/navbar-error`
- `docs/update-readme`

## STEP 3  Make your changes

Work only inside your assigned folders or files (e.g., `login/page.tsx`, `auth.service.ts`, etc.).

## STEP 4  Stage and Commit changes

```bash
git add .
git commit -m "feat(auth): add login page UI and logic"
```

## STEP 5  Push to GitHub

```bash
git push origin feature/login
```

## STEP 6  Create a Pull Request (PR)

1. Go to GitHub  Pull Requests tab  New Pull Request
2. Base branch  `dev`
3. Compare branch  your branch (e.g., `feature/login`)
4. Title example  Added Login UI and Auth Flow
5. Add reviewers (team lead or assigned member)
6. Merge only after review 

---

 Commit Message Convention (Very Important)

Follow this format:

```
<type>(scope): short description
```

Types youll use:

- `feat`  new feature (e.g., `feat(auth): add login API`)
- `fix`  bug fix (e.g., `fix(ui): correct navbar alignment`)
- `chore`  setup, configs, or minor maintenance (e.g., `chore: setup eslint and prettier`)
- `docs`  documentation updates (e.g., `docs: update project setup guide`)
- `refactor`  code restructure without feature change (e.g., `refactor(student): simplify merit calculation`)
- `style`  code formatting only (no logic change)
- `test`  adding or fixing tests

 Examples:

- `feat(student): add eligibility calculation feature`
- `fix(auth): resolve token expiration issue`
- `chore: initialize project structure`

 Main Rule Summary:

- Never push directly to `main`.
- Always work on your own branch from `dev`.
- Create a PR for review before merging.
- Keep commit messages clean and meaningful.
- Pull latest `dev` before starting new work.

---

If you'd like, I can also add a short checklist PR template and a branch-protection guide to this file. Tell me if you want those added and I'll update `GuidelinesREADME.md` accordingly.
