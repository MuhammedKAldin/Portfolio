## Laravel Project Documentation

### Included alongside the project are the following important files :

Included Files : 
1. Postman Collection
	- A collection of CRUD API routes for testing and interaction.

2. Database Setup
	- demo_countries_api.sql: Sample database schema and data.
	- Alternatively, use artisan migrations and seeders to set up the database.
3. Project Files
	- Controllers for web and API interactions.
	- Middleware for OAuth2 authentication.

### Project Overview
This project provides a comprehensive solution for managing countries through a CRUD module, SOAP APIs with OAuth2 authentication, and WebHooks for tracking updates. The system includes database changes and supports logging for all key operations. Below are the main features and steps:

### Libraries Used
 - Laravel Passport for OAuth2 authentication.
 - Bootstrap for responsive front-end design.
 - Custom SOAP Helper, Located at app/Helpers/SoapHelper.php and included in the composer.json file under the "files" array.

### Example API Usage

- **Register a User**
```json
POST /api/register
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "c_password": "password123"
}
```

- **Login as User***
```json

POST /api/login
{
    "email": "john@example.com",
    "password": "password123"
}
```

- **Include the token received in the Login response as a Bearer token for subsequent requests.**


### Example Use Cases
> Manage Countries via Web:
	- Use web routes to add, edit, or delete countries with multilingual support.

> Retrieve Countries via API:
	- Authenticate using OAuth2 and fetch country records in JSON or SOAP-compliant XML.

> Automated Notifications:
	- WebHooks notify external systems of changes in country records, enhancing real-time integration capabilities.

### Features and Steps
1. CRUD Dashboard (No Authentication Required)
 > A web-based interface to manage country records:
	 - Inputs: Name (EN/AR) and Description (EN/AR).
	 - Logs: Tracks updates made to country records.

 > Web Routes:
	- GET /: Displays all countries.
	- GET /create: Form to add a new country.
	- POST /store: Saves a new country to the database.
	- GET /edit/{id}: Form to edit an existing country by ID.
	- PUT /edit/update/{id}: Updates the country record.
	- DELETE /destroy/{id}: Deletes a country record.
	
2. Authenticated SOAP API with OAuth2
A secure API for managing and retrieving countries, with dynamic callback logging.
 - Authentication:
		- Users must log in and obtain a Bearer token to access API routes.
		- OAuth2 is used for token-based authentication.
	
 - Api Routes and Logging:
	- POST /register: User registration.
	- POST /login: User login.
	- GET /countries: Fetch all countries (supports XML response for SOAP).
	- POST /countries: Add a new country.
	- PUT /countries/{id}: Update an existing country.
	- GET /countries/{id}: Retrieve a country by ID.
	- DELETE /countries/{id}: Delete a country.
	- Logging Requests [ API requests are logged to the database, including dynamic callback URLs provided externally. ]

3. WebHook for Updates
Automatically notifies the callback API of changes to country records.
 - Trigger: Each create or edit operation triggers the WebHook.
 - Payload: Sends the following information to the callback API:
	- Update Type: Either create or edit.
	- Fields Changed: Includes old and new values (empty for new records).

### Controller Files

- **Controller**  
  A base controller that provides standard methods for formatting JSON responses.
  - `sendResponse($result, $message)` - Formats a successful JSON response with `success: true`, `data`, and a `message`.
    - Example:
      ```php
      $this->sendResponse(['token' => 'xyz123'], 'User registered successfully.');
      ```
  - `sendError($error, $errorMessages = [], $code = 404)` - Formats an error JSON response with `success: false`, `message`, and optional error details.
    - Example:
      ```php
      $this->sendError('Unauthorised', ['error' => 'Invalid credentials']);
      ```
- **UserController [Login, Register] OAuth2 Authentication**  
  Handles user registration and login functionalities via API.
  - `register(Request $request): JsonResponse` - Validates input data and registers a new user.  
    - Requires `name`, `email`, `password`, and `c_password` (confirmation of password).
    - Hashes the password and creates a new user record, returning an access token upon successful registration.
    - Example:
      ```json
      POST /api/register
      {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "password123",
          "c_password": "password123"
      }
      ```
  - `login(Request $request): JsonResponse` - Authenticates the user based on provided credentials.
    - On success, returns a JSON response with an access token and user name.
    - Example:
      ```json
      POST /api/login
      {
          "email": "john@example.com",
          "password": "password123"
      }
      ```
    - Note: Use the access token received upon login as a Bearer token in the Authorization header for accessing routes protected by the auth:api middleware.
	
- **WebController**  
  Handles web-based requests for viewing and managing `Country` records.
  - `index()` - Renders the homepage view with a list of all countries.
  - `create()` - Displays a form for adding a new country.
  - `store(Request $request)` - Validates and stores a new country record.
  - `edit($id)` - Retrieves a country by ID and displays it in an editable form.
  - `update(Request $request, $id)` - Updates an existing country, validating input and keeping an old copy for tracking.
  - `destroy($id)` - Deletes a specified country record.

- **APIController**  
  Manages API-based CRUD operations for `Country` records, including SOAP responses.
  - `index()` - Retrieves a list of all countries, returning in XML if SOAP is requested.
  - `show($id)` - Fetches a specific country by ID or returns an error if not found.
  - `store(Request $request)` - Validates and creates a new country, logging the creation.
  - `update(Request $request, $id)` - Updates an existing country, logging old and new data for tracking.
  - `destroy($id)` - Deletes a country by ID, logging the deletion action.

- **RequestLogController**  
  Handles request logging for tracking API interactions.
  - `logRequest(Request $request)` - Logs request details, such as method, endpoint, and parameters.
  - `logCreation`, `logUpdate`, `logDeletion` - Specialized methods to log creation, updates, and deletions of country records for audit and tracking purposes.