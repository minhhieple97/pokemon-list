# Pokémon List

This project is a Next.js application that displays a list of Pokémon with pagination and type filtering capabilities. It was created as part of a coding challenge to demonstrate proficiency in Next.js 14, TypeScript, and server-side components.

## Features

- Display a paginated list of Pokémon
- Filter Pokémon by type
- Server-side rendering for improved performance and SEO
- Responsive design for various screen sizes

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI components

## API

This project uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.

## Project Structure

The project follows a standard Next.js 14 structure with the App Router:

- `app/`: Contains the main application pages and layouts
- `components/`: Reusable React components
  - `common/`: General-purpose components
  - `ui/`: UI components (buttons, cards, etc.)
- `constants/`: Constant values used throughout the application
- `features/`: Feature-specific components and logic
  - `pokemon/`: Pokemon-specific components and hooks
- `lib/`: Utility functions and API calls
- `types/`: TypeScript type definitions

## Key Components

- `PokemonList`: Displays the list of Pokémon
- `TypeFilter`: Allows filtering Pokémon by type
- `Pagination`: Handles page navigation

## Server-Side Components

This project makes extensive use of Next.js 14's server-side components for improved performance:

These components fetch data on the server, reducing client-side JavaScript and improving initial load times.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser
