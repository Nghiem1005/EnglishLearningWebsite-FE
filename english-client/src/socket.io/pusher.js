import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1633033",
  key: "ff3bfb1ce109d04937b9",
  secret: "17f2501c13bc78756d2c",
  cluster: "ap1",
  useTLS: true,
});

export const pusherClient = new PusherClient("ff3bfb1ce109d04937b9", {
  cluster: "ap1",
});
