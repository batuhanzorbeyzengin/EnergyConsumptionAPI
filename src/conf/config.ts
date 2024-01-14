import "dotenv/config";
import consts from "./consts";

interface Config {
  PORT: number;
  JWT_SECRET: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT || `${consts.default_port}`, 10),
  JWT_SECRET: process.env.JWT_SECRET || consts.jwt_secret
};

export default config;
