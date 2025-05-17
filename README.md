# Personal-finance-express

**Author:** Karunia Syukur Baeha

## Description

Personal Finance Express is a daily financial tracking system that helps record and manage all daily income and expenses. By grouping entries into categorized income and expense views, users can monitor cash flow easily and systematically. This application is built with Node.js and Express.js, using MySQL as the database for storage and express-validator for input validation. Development speed is enhanced by nodemon.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaruniaSyukurBaeha/personal-finance-express.git

2. Navigate to the project directory:
   ```bash
   cd personal-finance-express
   ```

3. Install all dependencies from `package.json`:
   ```bash
   npm install
   ```

4. Or install core packages manually:
   ```bash
   npm install --save express mysql body-parser
   ```

5. Install nodemon for development with hot-reload:
   ```bash
   npm install nodemon
   ```


## Usage

1. Configure the database connection in `db.js`.
2. Start the server:
   ```bash
   node .
   ```

   Or use nodemon for hot-reload:
   ```bash
   nodemon .
   ```
3. Access the API at `http://localhost:5000`.

## License

ISC

