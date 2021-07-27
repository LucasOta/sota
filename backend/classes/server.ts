import express from "express";

export default class Server {
  public app: express.Application;
  public port = 3000;

  constructor() {
    this.app = express();
    if (process.env.PORT) {
      this.port = +process.env.PORT;
    } else {
      console.error("There is not a port");
    }
  }

  start(callback: any) {
    this.app.listen(this.port, callback);
  }
}
