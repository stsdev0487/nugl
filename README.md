## NUGL Web Client and Firebase App

### The NUGL client repo has the following "projects" within it

React Web Client (bootstrapped with CRA)

-   root level project
-   front end code under src/

Firebase Cloud Functions

-   under functions/
-   API endpoints are set up as an express app under functions/api

Scripts

-   One off scripts that needed/need to be run
-   Good for cleaning/sanitizing current database data

### Local development

AW:
You can run it like your usual react apps, but for my own convenience I've set up a docker image.
You can find my notes in bin/notes.txt.
Additionally, Windows' docker implementation has odd behavior on restart, so you may need to start docker, remove your current image (bin/docker/stop), restart docker, then start (bin/docker/start).
