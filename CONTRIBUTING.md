# Contributing

Hi! Nice to have you here! :)

First of all, huge thanks for your interest in contributing to unbaited!

Please take a moment to review this document before submitting your first pull request. Please also check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [daniel](https://x.com/nonzeroexitcode), or open an issue.

## Structure

This repository consists of two main parts:

```
.
├── landing          # The landing page website
│   ├── src
│   │   ├── app     # Next.js application
│   └── ...
└── extension       # The browser extension
    ├── src         # Extension source code
    └── ...
```

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/unbaited.git
```

### Navigate to project directory

```bash
cd unbaited
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Landing Page Development

Navigate to the landing directory and install dependencies:

```bash
cd landing
npm install
```

Run the development server:

```bash
npm run dev
```

### Extension Development

Navigate to the extension directory and install dependencies:

```bash
cd extension
npm install
```

Build the extension:

```bash
npm run build
```

To load the extension in your browser:

1. Chrome/Edge:
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension/dist` directory

2. Firefox:
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select any file in the `extension/dist` directory

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(extension): added firefox support`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).
