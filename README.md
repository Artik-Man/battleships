# Battleships

Try here: [https://artik-man.github.io/battleships/](https://artik-man.github.io/battleships/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Battle ship test task

1. Let's create an onscreen grid of cells aligned within a square 10 by 10.
2. Then we set up initial battle ships - one L shaped, one I shaped and two dot shaped. Initial battle ships cannot overlap.
3. Start actual game manually per play after any kind of user input which would simulate shots at random positions - any missed shot would indicate already hit area, any shot at any of initial ships would visually indicate that battle ship has sink (change of ship color would be fine enough). (note, no autoplay is needed)
4. Program must be able to tell that all ships have sunk and game is over. Seems simple enough and will show some actual code and how does person handles UI development - which frameworks and language dialects he feels most comfortable with and stuff like that.
5. Battle ships must not touch one another so there is at least a single cell between them. Any battle ship rotation must be random. Each ship must have outline color defining boundaries of a ship.
6. Multi cell battle ships (I && L) must consist of 4 cells, so there is no ambiguity of L shapes that do not look like L and I shapes of more or less than 4 cells.

## Development server

Run `npm run start` for a dev server. Your default browser will open `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `docs/` directory.
