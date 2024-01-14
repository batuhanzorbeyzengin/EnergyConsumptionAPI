interface Config {
  default_port: number;
  jwt_secret: string;
}

const config: Config = {
  default_port: 3010,
  jwt_secret: "aHFMU4BvS3",
};

export default config;
