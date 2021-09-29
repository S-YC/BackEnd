import { io, Socket } from "socket.io-client";
import config, { ChangeType } from "../config/config";
import { decrypt, encript, getRandomToken } from "./security";

let securityDump: string = getRandomToken();

let socket: Socket = io(config.url.socketApi, {
  autoConnect: false,
  transports: ["websocket"],
  auth: {
    [config.socket as string]: encript(securityDump),
  },
});
socket.on("connect_error", () => {
  console.log("error connect socket", config.url.socketApi);
  config.change(ChangeType.SOCKET);
  socket = io(config.url.socketApi, {
    autoConnect: false,
    transports: ["websocket"],
    auth: {
      [config.socket as string]: encript(securityDump),
    },
  });
});

async function hasConnect() {
  while (true) {
    socket.connect();
    socket.on("connect_error", error => {
      console.log(error);
    });
  }
}

export const connect: () => void = async () => {
  socket.connect();
  socket.on("gettoken", key => {
    console.log("success connect socket", config.url.socketApi);
    if (decrypt(key) === securityDump) {
      socket.emit("client:security", {
        token: config.token,
        security: config.security,
      });
    }
  });
};

export const disconnect: () => void = async () => {
  socket.disconnect();
};

export default socket;
