
# General Assembly SEI-49 | Project 3 - NALU :ocean:
​
![demo](readmeAssets/homepageExample.png)
Home Page

![addingComments](readmeAssets/nalucomments.gif)
Example of adding comments

## :rocket: Overview
Our product **aims to give users all current information related to the best surfing spots around the world.**  The user will have the **ability to search** any surfing spots by location which will display all detailed cards.

**This project raised the difficulties to work in a group which immediately allowed us to understand what were the market minimum requirements.** The 3 of us decided to allocate a **meticulous time to prepare** the redistribution of tasks between the client and backend.  One of the early difficulty was to **understand how to work with the git branches** in order to prevent conflicting with one and each others work.

<img src="readmeAssets/gitBranches.png" alt="gitBranches" width="350" />

---
The App is hosted here  
Else, kindly clone or fork the repository:  
To install all the packages listed in the package.json: —> npm i  
Check the console for any issues and if there are any then check the package.json for any dependancies missing —>  
Open the frontend code frontend in your terminal  
Type npm i in your terminal to dl dependencies then npm start  
Navigate to [http://localhost:3000/](http://localhost:3000/)

## :surfer: Contributers
* [Julien Xemard](https://github.com/JulienXemard)
* [Bec Sun](https://github.com/becsun)
* [Brenda Ty](https://github.com/brendino500)
* ([Dan Price](https://github.com/Zarathustrah))

## :hourglass_flowing_sand: Timeframe
7 days

## Technologies Used
* HTML5  
* SCSS & Bulma  
* ReactJS  
* JavaScript (ES6)  
* MongoDB & Mongoose  
* Bcrypt & JWT  
* Git Unix  
* Insomnia  
* Trello Board

---

## :desktop_computer: Technical Requirements
-   **Build a full-stack application**  by making your own backend and your own front-end
-   **Use an Express API**  to serve your data from a Mongo database
-   **Consume your API with a separate front-end**  built with React
-   **Be a complete product**  which most likely means multiple relationships and CRUD functionality for at least a couple of models
-   **Implement thoughtful user stories/wireframes**  that are significant enough to help you know which features are core MVP and which you can cut
-   **Have a visually impressive design**  to kick your portfolio up a notch and have something to wow future clients & employers.  **ALLOW**  time for this.
-   **Be deployed online**  so it's publicly accessible.

![addSurfSpot](readmeAssets/addingNewSurfSpots.gif)
Example of adding a new surf spot

---

## :mag: Features
* We were really excited to **implement MapBox** within our project as it was the perfect fit with our idea.  
* Therefore, we decided to **reverse engineer and factorise an idea** we came across during our researches:  
* The use of **conditional rendering** into MapBox to display our images under the form of cards if the user clicks onto the geolocated markers.

<img src="readmeAssets/mapboxExample.png" alt="mapbox" width="350" />
<br />
Example of MapBox


![ternary](readmeAssets/ternaryExample.png)
Example of ternary conditional rendering


## :trophy: Wins
* Along with our own MongoDB we also called **another 2 APIs: one for the weather & one for the tidal conditions.**  
* The challenge was to create a function that would allow us to **implement the latitude & longitude** available from our Seed file inside the API URL.  
* If extracting information from an API targeting one geolocation wasn’t too difficult, doing it for locations all over the world was a major headache but an **incredible learning curve.**

<img src="readmeAssets/apiView.png" alt="weatherApi" width="500" />

## :tada: Sources 
[Storm Glass](https://stormglass.io/)
<br />

[Open Weather API](https://openweathermap.org/api)
<br />

[MapBox](https://www.mapbox.com/)
<br />

[Hikr](https://hikrr.herokuapp.com/)