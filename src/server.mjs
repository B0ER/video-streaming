import https from "https";
import * as VideoController from "./modules/video/index.mjs";



/**
 * 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
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



const httpServer = https.createServer((req, res) => {
  httpHandler(req, res);
});



httpServer.listen(443, "0.0.0.0", () => {
  console.log("Server is working at 0.0.0.0:443");
});



process.on("rejectionHandled", (err) => {
  console.error(err);
});
