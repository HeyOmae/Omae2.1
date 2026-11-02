# Omae v2

Omae is a character generator for Shadowrun 5th Edition.
[Live demo can be found here](http://heyomae.github.io/).

## Technologies

* NodeJS - https://nodejs.org
* React - https://react.dev
* Redux - https://redux.js.org
* Bootstrap 4 - https://getbootstrap.com/docs/4.6/
* Vite - https://vite.dev
* Vitest and Testing Library - https://vitest.dev, https://testing-library.com

## Getting Started

1. Install NodeJS 22.12 or newer from nodejs.org.
2. Clone the repo (you may need to [install git](https://git-scm.com/download/win) if you're running Windows) I also recommend [setting up an SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) ```git clone git@github.com:HeyOmae/Omae2.1.git```
3. Navigate to the directory you cloned the repo to. This is usually done with the command ```cd /path/to/directory/```
4. Install dependencies with ```npm install```
5. Run dev server with ```npm start``` Which should open a browser and run the app

### Helpful commands

**Start Dev Server**
```
	npm start
```

**Run Tests**
```
	npm test
```

**Run Tests in watch mode**
```
	npm run test:watch
```

**Build for production** (outputs to `dist/`)
```
	npm run dist
```

**Preview the production build**
```
	npm run preview
```

**Lint the JS**
```
	npm run lint
```

**Fix all those nit picky little linting errors that you don't want to fix**
```
	npm run lint:fix
```

## Things that needs to get done

* Make Gear able to be modded, like vision gear, commlinks, etc
* Have different tables to display elecontric gear stats
* Add Knowledge skills
* Make qualities and adept powers actually effect stats
* Add Mentor Spirits
* Add Traditions
* Fix the styling I broke on iPhone
* Update the stats for metatypes from Run Faster errata
* Add more to this README
* Look in to integration/end-to-end testing
* Figure out how to make AIs and Shapeshifters work
* Hide jokes in the code base to entertain myself