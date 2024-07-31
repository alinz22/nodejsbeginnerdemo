const http = require("http");
const fs = require("fs");
// function rqListener(req, res) {}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<header><title>Enter message</title></header>");
    res.write(
      '<body><form action = "/message" method = "POST"><input type = "text" name = "message"> <button type = "submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<header><title>My First Page</title></header>");
  res.write("<body><h1>Hello from my Node.Js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
