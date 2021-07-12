# Secuirty Efforts for M5

## Added Security Features
* Prepaired SQL queries for login/register and the boxes search bar.
* Passcodes from login/register are hashed with 16 rounds of salt on the server side.
* Server side email validation for login/register.
* Serverside passcode strength validation for login/register.
* Characters in passcode fields for login/register are masked.
* Client side passcode strength meter for register.
* User sessions are handled on the server side when authenticated.
* The webserver now makes the API calls instead of the client and forwards the result to the client.

## Known Vulnerabilities
* CORS vulnerability where the server resource addresses can be changed on the client side to a third party server.
* The the API keys used stored in the server.js source file. This is to provide the functionality for the TAs without needed a disjoint envoirnment file. Normally you would include your API keys in an envoirnment file that is ignored by git to prevent the key from being leaked. However, our repo is private, and therefore a safe place to temporarily store our API keys.

## Penetration Testing
* Form fields have been retested with varous character sequences.
* Forms have been tested for vulnerabilities using SQL map.