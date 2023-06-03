<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://i.ibb.co/dc6kcKb/Logo.png">
    <img src="https://i.ibb.co/dc6kcKb/Logo.png" alt="Logo" width="350" height="350">
  </a>

  <h3 align="center">Manboota</h3>

  <p align="center">
    The best Plant-Care App!
    (Made with React Native)
    <br />
    
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]]

Manboota is a simple app made for a simple but crucial goal. This app is made for farmers or any person who has one or more plants or trees.
Manboota allows you to create a catalogue of all your plants/trees, filter them, name them and keeping track of when to water them.
The main function of the app is to set 2 types of alarms that will remind you to water your plants.

- first reminder type is a repeating one, where users can set a repeating alarm for example each 7days or each 2 months or days...etc
- second reminder type is a one time reminder, where users can set a one time only alarm in a specific date.
  once a reminder is set, users will see it in the upcoming events tab in the homepage also a progress bar will show under the plant's name to indicate the percentage of water existing in the plant, the progress bar will be at 100% once the reminder is set and will start to decline untill it reaches 0% => the date submitted by the user.

users can:

• create an account
• Add/Edit/Delete plants or trees
• Filter them based on type trees/plants or all
• Set a repeating reminder
• Set a one time reminder

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

I used these frameworks and libraries to create this App.

- [![React-Native][React.js]][React-url]
- [![Redux][Redux.com]][Redux-url]
- [![MongoDB][MongoDB.com]][MongoDB-url]
- [![NodeJS][NodeJS.com]][NodeJS-url]
- [![Express][Express.com]][Express-url]
- [![Mongoose][Mongoose.com]][Mongoose-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

First clone this repository, then create a .env file in config folder and fill it with your database url/port/jwtpassword/, finally install all the dependencies and run the app.

### Prerequisites

These are all the dependencies that I used in my project

- Manboota/ npm

  ```
  npm install react-native-gesture-handler
  npm install @react-navigation/stack
  npm install moment
  npm install react-native-modal-datetime-picker
  npm install @react-native-community/datetimepicker
  npm install react-native-select-dropdown
  npm install react-native-video
  npm install react-native-web
  npm install react-dom
  npm install react-redux
  npm install react-router-dom
  npm install redux-logger
  npm install redux
  npm install redux-thunk
  npm install react-native-reanimated
  npm install expo-secure-store

  ```

  - server/ npm

  ```
  npm install bcrypt
  npm install cors
  npm install express
  npm install express-validator
  npm install jsonwebtoken
  npm install mongoose
  npm install dotenv

  ```

<!-- USAGE EXAMPLES -->

## Usage

To see all the functionalities and use-case scenarios of my app please watch this short video explainer on my youtube channel:
[youtube video](https://www.youtube.com/embed/32oTO9PGgNs)
 <a href="https://i.ibb.co/7tr9CGp/thumbnail.jpg">
    <img src="https://i.ibb.co/7tr9CGp/thumbnail.jpg" alt="Logo" width="1366" height="613">
  </a>


<br />
Here are some screenshots from the app:
<div align="center">
  <a href="https://i.ibb.co/nzm493Q/appF.png">
    <img src="https://i.ibb.co/nzm493Q/appF.png" alt="Logo" width="1366" height="1040">
  </a>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Creating the design
- [x] Add account management abilities
- [x] Add plant management abilities
- [x] Add setting one time reminder ability
- [x] Add setting repeating ability
- [x] Add progress bar

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Marwen Bennaceur - [@Linkedin](https://www.linkedin.com/in/marwen-bennaceur-584366270/) - marwenbennaceur5@gmail.com

Project Link: [https://github.com/DedSeK404/MyPet](https://github.com/DedSeK404/MyPet)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are some of the resources I used.

- [React Native](https://reactnative.dev/)
- [MomentJS](https://momentjs.com/)
- [Date/Time picker](https://www.npmjs.com/package/react-native-modal-datetime-picker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/DedSeK404/Manboota/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/marwen-bennaceur-584366270/
[product-screenshot]: https://i.ibb.co/r765QGK/background.jpg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/R-React--Native-blue
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/B-Bootstrap-%23563D7C
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Mongoose.com]: https://img.shields.io/badge/M-mongoose-%23D9634D
[MongoDB.com]: https://img.shields.io/badge/M-mongoDB-%2396C40F
[Express.com]: https://img.shields.io/badge/E-Express-%23D7614B
[NodeJS.com]: https://img.shields.io/badge/N-NodeJS-%234EC820
[Redux.com]: https://img.shields.io/badge/R-Redux-%238B36DB
[Mongoose-url]: https://mongoosejs.com/
[MongoDB-url]: https://www.mongodb.com/
[Express-url]: https://expressjs.com/
[NodeJS-url]: https://nodejs.org/en
[Redux-url]: https://redux.js.org/
