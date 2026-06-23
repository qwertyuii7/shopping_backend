# Product Catalog Assignment

This project contains a full-stack solution for browsing a product catalog using cursor-based pagination. 

## Project Structure

- `frontend/`: A minimal, clean, black-and-white React application powered by Vite.
- `backend/`: An Express.js + MongoDB API that provides the data endpoints.

## Task Details: Cursor Pagination

This assignment focuses on implementing efficient cursor-based pagination. Unlike traditional offset-based pagination (`skip` and `limit`), cursor pagination provides a stable, fast way to paginate through large datasets. 

### Why Cursor Pagination?
When you skip records in a database, the database must scan through all preceding records to figure out where to begin. This becomes progressively slower on larger tables. By contrast, a cursor directly identifies the exact record from which the database should begin reading the next batch.

### Implementation
1. **Initial Request**: The client requests the first page (with an optional `category` filter).
2. **Data & Next Cursor**: The backend returns the first page of products. It also provides a base64 encoded string (`next_cursor`), which encapsulates the primary key (`_id`) and the sort field (`created_at`) of the last item in the list.
3. **Subsequent Requests**: The client sends back this `next_cursor` unchanged.
4. **Backend Decoding**: The backend decodes the cursor and queries MongoDB for items that come *after* those exact bounds, achieving lightning-fast subsequent fetches.

## Getting Started Locally

### Backend
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file containing your `MONGO_URI` (if required by your configuration).
4. Run the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000` by default.

### Frontend
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment

Both the frontend and backend have been configured to be easily deployable on modern hosting platforms (like Vercel, Render, or Heroku).

- **Backend**: Uses the dynamic environment variable `process.env.PORT` to bind to the correct port provided by the host. A `start` script is included in `package.json`.
- **Frontend**: Uses Vite's `VITE_API_URL` environment variable. When deploying the frontend, simply define `VITE_API_URL` (e.g., `https://your-backend-url.onrender.com`) to connect to your live API.
