// this javascript file is loaded by node.js and runs on the server-side

// load the core node http module
const http = require('http');
// load the core node filesystem (fs) module, using js promises instead of callbacks
const fs = require('fs').promises;
// create a function to respond to http requests
function requestListener (myRequire, myResponse) {
// check the request url and return a file's content
  const urlarr = myRequire.url.split('/');
  // console.log(urlarr);

  switch (urlarr[1]) {
    case 'item' :   loadingReturn('public/item.html', 'text/html', myResponse)
      break;
    case 'client' :
loadingReturn('public/client.js', 'text/javascript', myResponse)
      break;
    case 'data' :
    loadingRequest('data.json', 'application/json', myResponse)
      break;
    default: // any other url including just root "/"
     loadingReturn('public/list.html','text/html', myResponse) 
  }
  
  myResponse.writeHead(200);
  myResponse.end();
}

const server = http.createServer(requestListener);

server.listen(
  8080,
  "0.0.0.0",
  function () {
    console.log("server is running");
  }
)

// perform file reading for any file and mime 
// then return using response object res
function loadingReturn (fileName, contentType, myResponse) {
   // load file from server filesystem
  fs.readFile(__dirname + '/' + fileName)
  .then(contentType => {
    // set http response header entry text/html
   myResponse.setHeader('Content-Type', contentType + '; charset=UTF-8');
// return 200 OK http status code
  myResponse.writeHead(200);
    // send back file contents + close response
    myResponse.end();
}
 );
}