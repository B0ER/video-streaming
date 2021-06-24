import path from "path";
import * as VideoService from "../service/index.mjs";

const videoPath = path.resolve("public", "video.mp4");


/**
 * 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
export const streamVideo = async (req, res) => {
  const range = req.headers.range;

  const [startString, endString] = range.replace(/bytes=/, "").split("-");
  const start = parseInt(startString, 10);
  const end = endString ? parseInt(endString, 10) : undefined;


  const filePlayingMeta = await VideoService.resolveFile(videoPath, { start, end });
  const fileStream = await VideoService.readStreamingFile(videoPath, filePlayingMeta);


  res.writeHead(206, {
    "Content-Range": "bytes " + filePlayingMeta.start + "-" + filePlayingMeta.end + "/" + filePlayingMeta.total,
    "Accept-Ranges": "bytes",
    "Content-Length": filePlayingMeta.chunkSize,
    "Content-Type": "video/mp4",
  });


  fileStream.on("open", () => {
    fileStream.pipe(res);
  });

  fileStream.on("end", () => {
    res.end();
  });

  fileStream.on("error", (err) => {
    console.error(err);
    res.end(err);
  });
};
