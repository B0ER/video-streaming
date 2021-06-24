import http from "http";
import * as VideoController from "./modules/video/index.mjs";



/**
 * 
 * @param req {http.IncomingMessage}
 * @param res {http.ServerResponse}
 */
const httpHandler = async (req, res) => {

  if (req.url === '/') {
    await VideoController.getMainPage(req, res);
    return;
  }

  if (req.url === '/video') {
    await VideoController.streamVideo(req, res);
    return;
  }
};



const httpServer = http.createServer((req, res) => {
  httpHandler(req, res);
});



httpServer.listen(3000, "0.0.0.0", () => {
  console.log("Server is working at 0.0.0.0:3000");
});



process.on("rejectionHandled", (err) => {
  console.error(err);
});
