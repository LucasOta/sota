import jwt from "jsonwebtoken";

export default class Token {
  private static seed = "secret-seed";
  private static caducidad = "30d";

  static getJwtToken(payload: any): string {
    return jwt.sign(
      {
        user: payload,
      },
      this.seed,
      { expiresIn: this.caducidad }
    );
  }

  static checkToken(userToken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(userToken, this.seed, (err, decoded) => {
        err ? reject() : resolve(decoded);
      });
    });
  }
}
