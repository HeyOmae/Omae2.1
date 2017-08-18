# Omae v2

Omae is a character generator for Shadowrun 5th Edition.
[Live demo can be found here](http://heyomae.github.io/).

## Technologies

* NodeJS - https://nodejs.org
* React - https://facebook.github.io/react/docs/getting-started.html
* Redux - http://rackt.org/redux/index.html
* Bootstrap 4 - http://v4-alpha.getbootstrap.com/layout/overview/
* Yeoman - http://yeoman.io/

## Getting Started

1. Install NodeJS from nodejs.org. I'm currently using Node 7.4.0, but in theory a few older versions should still work too.
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
	npm run test:watch
```

**Create a release**
// TODO: Make this actually tag a release and bump the version number
```
	npm run dist
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
* Update project dependencies
* Add more to this README
* Actually write unit tests for the react components
* Look in to integration/end-to-end testing
* Figure out how to make AIs and Shapeshifters work
* Hide jokes in the code base to entertain myself