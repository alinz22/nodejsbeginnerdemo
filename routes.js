const fs = require("fs");

function requestHandler(req, res) {
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
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<header><title>My First Page</title></header>");
  res.write("<body><h1>Hello from my Node.Js Server!</h1></body>");
  res.write("</html>");
  res.end();
}

// module.exports = { handler: requestHandler, someText: "This is a sample text" };

exports.handler = requestHandler;
exports.someText = "This is a sample text";
