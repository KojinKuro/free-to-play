
# 🎮 F2P Database

This is the front end user interface for a database of free to play games. The goal of this project was to provide a way for gamers, with little to no money, an easy way to find new games to play. This project was also used as a way for me to start using Tyepscript in a project. I hope you enjoy looking through the database and find a game that you like!

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
## 📸 Screenshots

![App Screenshot](https://github.com/KojinKuro/free-to-play/assets/11234292/5993b2f5-cc94-4d3c-9a23-de33c3197b1e)


## 🎥 Demo

https://f2pdb.vercel.app/

## ✨ Features

- 100% written using Typescript
- API calls to a database of free to play games
- Random game selector if you're feeling lucky
- Searching for game with fuzzy search
- Sort for games by trending or release date
- React router for that multi page application feel
- React Error boundaries for displaying errors
- Responsive design for mobile, and super wide monitors
- End-to-end testing using Cypress


## 📥 Installation

Install F2P Database with npm

```bash
git clone git@github.com:KojinKuro/free-to-play.git
cd free-to-play
npm install
npm run dev
```

The server should be running locally on: `localhost:5173`
    
## 🧪 Running Tests

To run tests, run the following command

```bash
npm run e2e
```

Our end-to-end testing solution is Cypress. For more information on how Cypress works, please check out the [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress).
## 📝 Context

This project was created by one developer, me! It took an estimated 50 hours to complete this project at time of writing. These 50 hours were spread out over the course of a week. It's purpose was to act as a final showcase project at Turing School of Software & Design.

For managing the project tasks, I used a mix of Github Projects with some note taking. If anyone intrested, here's the [mockups and wireframes](https://www.figma.com/design/MYzvvy3Uuj2HjFg2tWz3jg/Untitled?node-id=3-95&t=9bv8EULXCqVQd67N-0) I came up with!
## 📚 Lessons Learned

While working on this project, a big thing I ran into was realizing my limiations as a developer. Many of the projects I had been working on to this point were group projects so I (as a team) was able to get a lot of work done. Having done done a solo project in a while, I realized how long some tasks take, even if I know every step to get there.

It was fun learning Typescript for this project. I realized a lot of the benefits that adding it into Javascript beyond simple type safety. Some things that I found intresting were: it's makes for great autocomplete, the Typescript compiler is great at catching errors for me. It was also surprisingly easy to integrate it with other packages, even if the author did not include it originally. Using it felt like a good balance between other heavy languages like Java and the lightness of Javascript.

Looking back, I realized that I used a decent amount of npm packages. The reasoning behind this was that, given only a week, it was unfeasible to program everything myself. In the future I'd like to spend time leanring to program all the features I offloaded to npm packages on my own. For example: being able to make a carousel or a fuzzsort alogrithm. Some things I think are fine just using a package such as Error Boundary. I already understand how it works and don't see any benefit in implementing it myself.
## 🛤️ Roadmap

- Light mode / dark mode
- User authentication
- Creating my own backend API and not relying on a public API
- Add a database so users can store information such as reviews or submit there games
- Moderatorating capabilities for managing this website 
- Add in a component library
- Furthur CSS styling improvements

## 👥 Authors

Coded & Designed by [Charles Kwang](https://www.github.com/KojinKuro)

Data provided by the [FreeToGame API](https://www.freetogame.com/)
## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)

