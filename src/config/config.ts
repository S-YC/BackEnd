import config from "./state.json";

export enum ConfigEnv {
  LOCAL = "local",
  DEV = "dev",
  BUILD = "build",
}

interface IRedis {
  host: string;
  port: number;
  db: number;
  auth?: string;
  password?: string;
}

interface IAws {
  access_key_id: string;
  secret_access_key: string;
  bucket: string;
  url: string;
}

interface IDb {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  multipleStatements: boolean;
}

export interface ISecurity {
  key: string;
  algorithm: string;
  slice: number;
}

interface IConfig {
  dbindex: number;
  socketindex: number;
  db: IDb;
  token: {
    name: Array<string>;
    key: string;
  };
  security: ISecurity;
  password: {
    count: number;
    keylen: number;
    digest: string;
  };
  log: string;
  aws: IAws;
  socket?: string;
  url: {
    socketApi: string;
    redis: IRedis;
  };
  change: (type: ChangeType) => Promise<void>;
}

export const envType: ConfigEnv = ((): ConfigEnv => {
  switch (process.env.NODE_ENV) {
    case "development":
      return ConfigEnv.DEV;
    case "production":
      return ConfigEnv.BUILD;
    default:
      return ConfigEnv.LOCAL;
  }
})();

function getSocket(index: number): string {
  switch (process.env.NODE_ENV) {
    case "development":
    case "production":
      return config.url.socketApi[envType] as string;
    default:
      return config.url.socketApi[envType][
        index % config.url.socketApi[envType].length
      ];
  }
}

function getDb(index: number): IDb {
  switch (process.env.NODE_ENV) {
    case "development":
    case "production":
      return config.db[envType] as IDb;
    default:
      return (config.db[envType] as [])[
        index % (config.db[envType] as []).length
      ] as IDb;
  }
}

export enum ChangeType {
  DB = "db",
  SOCKET = "socket",
}

let configInfo: IConfig = {
  dbindex: 0,
  socketindex: 0,
  db: getDb(0),
  token: config.token,
  log: config.log,
  aws: config.aws,
  password: config.password,
  security: config.security,
  socket: config.socket,
  url: {
    socketApi: getSocket(0),
    redis: config.url.redis[envType] as IRedis,
  },
  change: async (type: ChangeType) => {
    switch (type) {
      case ChangeType.DB:
        configInfo.dbindex++;
        configInfo.db = getDb(configInfo.dbindex);
        break;
      case ChangeType.SOCKET:
        configInfo.socketindex++;
        configInfo.url.socketApi = getSocket(configInfo.socketindex);
        break;
    }
  },
};

export default configInfo;
