# Problem5

## Description
This project is a simple RESTful API built with Express.js and TypeScript for managing resources in a database. It provides endpoints for creating, retrieving, updating, and deleting resources. The database connection is established using the MySQL driver, and environment variables are loaded using dotenv.

## Installation
1. Clone this repository.
2. Install dependencies using `npm install`.

## Usage
1. Set up a MySQL database and configure the connection details in the `.env` file.
2. Start the server using `npm start`.
3. Use tools like Postman or curl to interact with the API endpoints.

## Endpoints
- `POST /resources`: Create a new resource.
- `GET /resources`: Retrieve all resources.
- `GET /resources/:id`: Retrieve details of a specific resource.
- `PUT /resources/:id`: Update details of a specific resource.
- `DELETE /resources/:id`: Delete a specific resource.

## Environment Variables
Make sure to set the following environment variables in a `.env` file:
## Scripts
- `start`: Runs the TypeScript code using ts-node.

## Author
Riven(NguyenHaPhuocHau)

## License
This project is licensed under the ISC License.
