This app is real messenger with user authentification

Try this on https://chat-asltyn.herokuapp.com/

Main app features:

this app allow you to create private and group chat
for authorization purposes uses JSON Web Token (jwt library). Once the user is logged in, each subsequent request will include the JWT, allowing the user to access services, and resources that are permitted with that token
all messages are encrypted and stored at database
for encryption and decryption messages uses asymmetric cryptographic algorithm RSA (cryptico library https://github.com/wwwtyro/cryptico). For generating public and private keys used a PassPhrase - user password
this app is Finite State Machine (build with xstate library)
for rendering UI used React library
backend developed with express.js library
database, used in this project - MongoDB
