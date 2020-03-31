## Table of contents
* [Introduction](#general-info)
* [Technologies](#technologies)
* [](#)
* [](#)
* [](#)
* [](#)
- what is this project
  - slack bot screenshots
- how to use the project
- how to develop the project

## Project Title
- Serverless Api
## General Started
- Download the project 
## Introduction
- This project implements REST-API which is designed to be integrated with a slack-app.Using this API, I have created a slack command (/weather city_name) using which users can see the weather details of the specified city.
- Below is a snapshot of output
  * ![slack weather command](image.png) 
## Technologies
- The project has been implemented using Node.js, AWS lambda, API Gateway.
## Setup
```
npm install
```
## Deploy
`serverless deploy`
## Sources/ API Reference
- The Project makes use of Dark Sky Api and Geocode Api.
  - Geocode Api is used to fetch latitude and longitude based on city name provided
  - Dark Sky Api is used to fetch weather conditions based on latitude and longitude.
