# MetronoMe

## Description
![wireframe](https://github.com/ignazka/metronome-backend/blob/master/wireframe.png?raw=true)
An application for musicians.
Artists are able to create setlists with BPM next to the song. BPM is editable.

## Backlog
* Fullscreen visualization of beat
* Different Click Sounds
* Tapping function
* Maybe a Tuner

## ROUTES:
GUESTs
- POST /login
  - gets email and password
  - checks credentials
    - sends 200 if ok, sends user.object back
    - sends 400 if password or mail is missing
    - sends 400 if user not found
    - - sends 400 if password is wrong
    - sends 500 if server error occurs
  - writes a user in session
- POST /signup
  - gets email and password
  - compares password and password-confimation
  - sends 400 if passwords not equal
  - sends 400 if user in use already
  - generates password hash
  - saves user in database
  - writes a user in session
PRIVATEs
- DELETE /delete 
  - deletes user from database and all his items in database
  - delete user in session.object
- POST /logout
  - log out user // delete user in session.object
- GET /is-logged-in
  - sends back session-user
- setlist
  - POST /setlist
    - creates new setlist
  - GET /setlist/:id
    - returns setlist by id
  - PUT /setlist/:id
    - saves changes in setlist
  - DELETE /setlist/:id
    - deletes setlist
- song
  - POST /song
    - creates new setlist
  - GET /song/:id
    - get song by id
  - PUT /song/:id
    - saves changes in song
  - DELETE /song/:id
    - deletes song

## Models

User model
 
```
email: String, required, unique
password: String, required
```

Setlist model
```
name: String, required, unique
user: [Object_id ref: user_id]
songs: [Object_id ref: songs_id]
```
Song model
```
name: String, required
songs: [Object_id ref: songs_id]
BPM: Number, required
Notes: String
```

## Links

### Trello/Kanban

[Link to our Kanban board]()

### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()

### Slides

The url to your presentation slides

[Presentation Link]()
