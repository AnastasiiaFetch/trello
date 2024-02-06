# Trello 2.0

The Trello-inspired website, adapted for different devices, offers a user-friendly platform for
organizing tasks and projects.

## Technologies Used

- **React:** React was chosen as the primary frontend library due to its flexibility, performance,
  and vast ecosystem of reusable components. Its component-based architecture allows for modular
  development, facilitating scalability and maintainability of the project.

- **TypeScript:** TypeScript was integrated into the project to leverage its static typing
  capabilities. By adding types to JavaScript, TypeScript enhances code quality, improves developer
  productivity, and reduces the likelihood of runtime errors, thereby ensuring a more robust and
  reliable application.

- **Zustand:** Zustand, a minimalistic state management library for React, was selected to manage
  application state. Its simplicity and ease of use make it ideal for small to medium-sized
  projects, providing a convenient alternative to more complex state management solutions like
  Redux.

- **Chakra UI:** Chakra UI was utilized for building the user interface components of the
  application. Its customizable and accessible component library offers a rich set of UI primitives,
  enabling rapid development of visually appealing and responsive user interfaces while maintaining
  consistent design patterns.

- **React Query:** React Query was incorporated to handle data fetching and caching in the
  application. Its declarative approach to data fetching simplifies complex asynchronous operations,
  optimizes network requests through caching, and seamlessly integrates with React components,
  streamlining the development of data-driven interfaces.

Additionally, the project utilizes the REST API to handle asynchronous HTTP requests with Axios. Yup
is used for form validation, offering a simple and efficient way to define and validate data
schemas. React Hook Form is included to manage form state and validation logic, enhancing the user
experience when interacting with forms in the application.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/AnastasiiaFetch/trello.git
   ```

2. Navigate to the project directory:

   ```bash
   cd trello
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The website will be accessible at `http://localhost:5173`.
