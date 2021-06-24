import fs from "fs";

/**
 * 
 * @param {import("stream").ReadableStream} filePath
 * @param { { start: number; end: number; } } period
 * 
 * @returns {Promise<ReadableStream>}
 */
export const readStreamingFile = async (filePath, { start, end }) => {
  const fileStream = fs.createReadStream(filePath, { start: start, end: end });
  return fileStream;
};
