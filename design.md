# design

```js
// https://medium.com/@MichalMecinski/architecture-of-a-node-js-multiplayer-game-a9365356cb9

// folder structure
lib/
    - client/
    - server/
    - shared/
public/
client.js
server.js

// server files
server
    - server.controller
    - game/
        - game.controller
        - game.model
    - player/
        - player.controller
        - player.model
    - room/
        - room.controller

// client files
client
    - client.controller
    - stage/
        - stage.controller
        - stage.view
```

## ServerController

* Handles new connections from clients
* performs authentication
* creates/destroys game and player controllers
* responsible for persisting data
* logging
* other maintenance tasks.

## GameController

Depending on the type of the game, there is one object per game world, game room or other virtual place where multiple users can play together. It is responsible to changing the state of the game in response to player actions and for notifying players about these changes.

## Game

Represents the current state of the game on both the client and the server

## PlayerController

* There is one object per each client connected to the server
* It handles incoming messages from the client
* performs actions in the game on behalf of the player
* periodically sends messages containing updates of the state of the game to the client

## ClientController

* There is one object per client
* It handles incoming messages from the server
* updates the state of the game
* handles user input
* sends messages about user actions to the server

## GameView

* Renders the game in a browser
* passes input events from the browser to the client controller
