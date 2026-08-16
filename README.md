# LearnLingo

LearnLingo is a web application for a company that connects students with online language teachers.

Users can browse teachers, filter them by language, student level, and hourly price, read detailed teacher information and reviews, request a trial lesson, and save teachers to a personal favorites list.

The application was built with React, Vite, and Firebase. The interface is primarily optimized for desktop screens and follows the provided Figma design.

## Live Demo

[View the deployed application](https://learn-lingo-pi-sandy.vercel.app/)

## Repository

[View the source code on GitHub](https://github.com/lisaVecher/learn-lingo)

## Design

The user interface was implemented according to the provided Figma design:

[View the LearnLingo Figma design](https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=0-1&p=f&t=jBKxfBGhNRhEnCgE-0)

## Main Features

- Home page with company benefits and a call-to-action button
- Navigation between the Home, Teachers, and Favorites pages
- User registration, login, session restoration, and logout
- Authentication handled with Firebase Authentication
- Form validation implemented with React Hook Form and Yup
- Teacher catalog loaded from Firebase Realtime Database
- Loading four teacher cards at a time
- Loading additional teachers with the `Load more` button
- Teacher filtering by:
  - teaching language
  - student knowledge level
  - hourly price
- Empty results state and filter reset
- Expandable teacher cards with experience and student reviews
- Reviewer avatars with a fallback when an image is unavailable
- Adding and removing teachers from favorites
- Favorites stored separately for each authenticated user in `localStorage`
- Private Favorites page
- Trial lesson booking modal with validated fields
- Modal closing by the close button, backdrop click, and `Escape`
- Success and error notifications
- Loading states
- Custom 404 page
- Custom LearnLingo favicon and design assets

## Application Routes

| Route        | Description                                                 | Access  |
| ------------ | ----------------------------------------------------------- | ------- |
| `/`          | Home page with company benefits and the main call to action | Public  |
| `/teachers`  | Teacher catalog with filters and pagination                 | Public  |
| `/favorites` | Teachers saved by the current user                          | Private |
| `*`          | Custom 404 page                                             | Public  |

## Technologies

- React 19
- Vite 8
- JavaScript
- React Router 8
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup
- React Hot Toast
- CSS Modules
- Oxlint

## Technical Specification

The application implements the following requirements:

1. Create three main pages: Home, Teachers, and the private Favorites page.
2. Use React Router for client-side navigation.
3. Implement registration, login, current-user tracking, and logout with Firebase Authentication.
4. Implement registration, login, and trial lesson forms with required fields and Yup validation through React Hook Form.
5. Close modal windows with the close button, a backdrop click, or the `Escape` key.
6. Store teachers in Firebase Realtime Database with the required fields: name, surname, languages, levels, rating, reviews, hourly price, completed lessons, avatar, lesson information, conditions, and experience.
7. Display four teacher cards initially and request the next portion from the database after clicking `Load more`.
8. Filter teachers by language, student level, and hourly price.
9. Display extended teacher information and reviews after clicking `Read more`.
10. Allow authenticated users to add teachers to Favorites and remove them with a repeated heart-button click.
11. Preserve the Favorites state after a page refresh and notify unauthenticated users that the feature requires authentication.
12. Open a validated trial lesson form after clicking `Book trial lesson`.

## Firebase Services

The application uses Firebase for:

- email and password authentication;
- restoring the authenticated user session;
- retrieving teachers from Realtime Database;
- querying teachers in portions for the `Load more` functionality.

Teacher records are stored under the `teachers` node in Realtime Database.

Example teacher data structure:

```json
{
  "name": "John",
  "surname": "Doe",
  "languages": ["English", "Spanish"],
  "levels": ["A1 Beginner", "A2 Elementary"],
  "rating": 4.5,
  "reviews": [
    {
      "reviewer_name": "Alice",
      "reviewer_rating": 5,
      "comment": "John is an excellent teacher!"
    }
  ],
  "price_per_hour": 25,
  "lessons_done": 1375,
  "avatar_url": "https://example.com/avatar.jpg",
  "lesson_info": "Information about the lessons.",
  "conditions": ["Teaching conditions."],
  "experience": "Information about teaching experience."
}
```

## Getting Started

### Requirements

Before starting, make sure you have installed:

- Node.js 20.19 or newer
- npm

Check the installed versions:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/lisaVecher/learn-lingo.git
```

Go to the project directory:

```bash
cd learn-lingo
```

Install the dependencies:

```bash
npm install
```

### Firebase Configuration

Create a `.env` file in the project root using `.env.example` as a template:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Fill the variables with the configuration values of your Firebase Web App.

In Firebase Console:

1. Enable the `Email/Password` sign-in provider in Authentication.
2. Create a Realtime Database.
3. Import the teacher collection under the `teachers` node.

The local `.env` file must not be committed to the repository. The `.env.example` file contains only the required variable names.

### Development

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in the terminal.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Run Oxlint:

```bash
npm run lint
```

## Project Structure

```text
learn-lingo/
├── public/
│   ├── reviewers/
│   └── favicon.svg
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

## Author

[Yelyzaveta Vecherovska](https://github.com/lisaVecher)
