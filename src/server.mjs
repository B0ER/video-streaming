import transport from "http";
import * as VideoController from "./modules/video/index.mjs";

const PORT = process.env.PORT || 3000;



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



const httpServer = transport.createServer((req, res) => {
  httpHandler(req, res);
});



httpServer.listen(PORT, () => {
  console.log(`Server is working at 0.0.0.0:${PORT}`);
});



process.on("rejectionHandled", (err) => {
  console.error(err);
});
