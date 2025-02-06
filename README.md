# Express File Server with Chunked Streaming and Gzip Compression

## Project Overview
This project is a simple Node.js application built using the Express framework. The server reads and serves text files, supports chunked streaming, and compresses files using Gzip.

## Features
- Serve a text file using normal file read (`fs.readFile`).
- Serve a text file in chunks using streams (`fs.createReadStream`).
- Automatically create a Gzip compressed version of the file on server startup.
- Monitor server health and status using `express-status-monitor`.

## Prerequisites
Ensure that you have the following installed:
- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Installation
1. Clone the repository or download the project files.
2. Navigate to the project directory.
3. Install the required dependencies by running:
   ```bash
   npm install express express-status-monitor zlib
   ```

## Project Structure
```
.
|-- index.js         # Main server file
|-- plain.txt        # Sample text file to be served and compressed
```

## Usage

### Running the Server
Start the server by running:
```bash
node index.js
```
The server will start on port `7000`.

### Endpoints
- **GET /**
  - Description: Serves the content of `plain.txt` using `fs.readFile`.
  - Example:
    ```bash
    curl http://localhost:7000/
    ```

- **GET /chunks**
  - Description: Serves the content of `plain.txt` in chunks using `fs.createReadStream`.
  - Example:
    ```bash
    curl http://localhost:7000/chunks
    ```

### Compression
On server startup, a Gzip-compressed version of `plain.txt` is created as `plainsamplezip.zip`.

### Server Monitoring
Access the server status dashboard at:
```
http://localhost:7000/status
```

## Code Breakdown

### File Reading (Normal)
```javascript
app.get("/", (req, res) => {
  fs.readFile("./plain.txt", (err, data) => {
    res.end(data);
  });
});
```
This endpoint reads the entire file at once and serves it.

### Chunked Streaming
```javascript
app.get("/chunks", (req, res) => {
  const stream = fs.createReadStream("./plain.txt", "utf-8");
  stream.on("data", (chunk) => {
    res.write(chunk);
  });
  stream.on("end", () => {
    res.end();
  });
});
```
This endpoint reads and serves the file in chunks, reducing memory usage for large files.

### Gzip Compression
```javascript
const makeZip = async (filePath, destinationPath) => {
  const stream = fs.createReadStream(`${filePath}`, "utf-8");
  stream.pipe(zlib.createGzip().pipe(fs.createWriteStream(`${destinationPath}`)));
};

makeZip('./plain.txt', './plainsamplezip.zip');
```
This function compresses `plain.txt` into `plainsamplezip.zip` on server startup.

## Dependencies
- `express`: Web framework for Node.js.
- `fs`: Built-in Node.js module for file system operations.
- `express-status-monitor`: Middleware for monitoring server status.
- `zlib`: Built-in Node.js module for compression.
