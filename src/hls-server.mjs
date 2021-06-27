import HLSServer from "hls-server";
import http from "http";

const PORT = process.env.PORT || 3000;


const server = http.createServer();

const hlsServer = new HLSServer(server, {
  path: '/streams',     // Base URI to output HLS streams
  dir: './media'        // Directory that input files are stored
});

server.listen(PORT);
