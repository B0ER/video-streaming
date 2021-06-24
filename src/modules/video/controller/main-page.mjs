/**
 * 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
export const getMainPage = (req, res) => {
  const host = req.headers.host;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<video style="width: 100%; height: auto;" src="http://${host}/video" controls></video>`);
};
