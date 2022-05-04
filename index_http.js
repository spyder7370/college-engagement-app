const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("<h1>Hello world</h1>");
    res.end();
  } else if (req.url == "/red") {
    res.write("Hello Red!");
    res.end();
  } else if (req.url == "/black") {
    res.write("Hello Black!");
    res.end();
  } else if (req.url == "/product") {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(
      "<form action='/get-info' method='POST'><input type='text'></input><button type='submit'>Submit</button></form>"
    );
    res.end();
  } else if (req.url == "/get-info") {
      console.log(req.body);
    res.write(
      "Collected Data"
    );
    res.end();
  }
});

// req.body

server.listen(3000, () => {
  console.log("Listening at 3000");
});

// NPM
// nodemon
// npm install -g nodemon
// Cltr+c - to stop server in terminal
{
  /* <form method="POST" action="/red">
    
</form> */
}

// 404 
// 500 : Internal server error 
