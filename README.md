# Movie Finder App

A responsive web application to search and explore movies effortlessly, built using React and Tailwind CSS with API integrations from The Movie Database (TMDb) and Appwrite for backend operations.

## Features

- **Search Movies:** Search for movies with real-time suggestions.
- **Trending Movies:** Display the most popular movies trending right now.
- **Debounced Search:** Prevent excessive API calls with debounced search functionality.
- **Data Persistence:** Save and update search counts for analytics using Appwrite.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Appwrite
- **API Integration:** TMDb API
- **Utilities:** `react-use` for debouncing

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/movie-finder.git
   cd movie-finder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
   VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
   VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in your browser:**
   Navigate to `http://localhost:3000` to view the app.

## Folder Structure

```
movie-finder/
├── public/
│   ├── hero-img.png
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MoviesCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── appwrite.js
│   ├── App.jsx
│   ├── globals.css
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

## Key Files

### `App.jsx`

The main component handling:

- Debounced search functionality
- Fetching movies from TMDb API
- Displaying trending and searched movies

### `appwrite.js`

Handles Appwrite client initialization and database operations such as:

- Fetching search count
- Updating or creating new records for search analytics

### `globals.css`

Defines global styles and integrates Tailwind CSS utilities.

## API Integrations

### TMDb API

- Used for fetching movie data.
- Requires an API key from [The Movie Database](https://www.themoviedb.org/).

### Appwrite

- Used for storing search analytics.
- Requires setup with a project, database, and collection configured in Appwrite.

## Usage

1. **Search for Movies:** Enter a search term in the search bar to fetch movies.
2. **View Trending Movies:** Check the trending section for popular movies.
3. **Background Image:** A visually appealing full-screen background enhances the user experience.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [TMDb API](https://www.themoviedb.org/)
- [Appwrite](https://appwrite.io/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

