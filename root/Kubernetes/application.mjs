"use strict";

import { createServer } from "http";

const server = createServer((request, response) => response.end("Success"));

server.listen(5000, () => console.log("Running: http://localhost:5000"));
