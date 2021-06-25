import transport from "http";
import path from "path";
import fs from 'fs';
import * as RtcController from "./modules/rtc/index.mjs";
import * as VideoController from "./modules/video/index.mjs";

const PORT = process.env.PORT || 3000;



/**
 * 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
const httpHandler = async (req, res) => {

  if (req.url.includes('/public')) {
    try {
      const dataStream = fs.createReadStream(path.resolve(req.url.slice(1)));
      res.writeHead(200);
      dataStream.pipe(res);

      dataStream.on("end", () => {
        res.end();
      });

    } catch (err) {
      console.error(err);
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
  }

  if (req.url === '/rtc/index') {
    // await RtcController.getMainPage(req, res);
    return;
  }

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
