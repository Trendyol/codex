import * as dotenv from 'dotenv';

dotenv.config();

export interface Config {
  ports: {
    app: number;
    peer: number;
    monacoSync: number;
  };
  jwt: {
    secret: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  couchbase: {
    connectionString: string;
    bucketName: string;
    username: string;
    password: string;
  };

  redirectUrl: string;
  clientUrl: string;
  judge0: {
    url: string;
    key: string;
  };
  storage: {
    cdn: {
      secret: string;
      environment: string;
      team: string;
      path: string;
    };
  };
}

export const config = {
  ports: {
    app: Number(process.env.PORT) || 4000,
    peer: Number(process.env.PORT_PEER) || 4001,
    monacoSync: Number(process.env.PORT_MONACO_SYNC) || 4002,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  couchbase: {
    connectionString: process.env.CB_CONNECTION_STRING,
    bucketName: process.env.CB_BUCKET_NAME,
    username: process.env.CB_USERNAME,
    password: process.env.CB_PASSWORD,
  },
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  judge0: {
    url: process.env.JUDGE0_URL,
    key: process.env.JUDGE0_KEY,
  },
  storage: {
    cdn: {
      secret: process.env.STORAGE_CDN_SECRET,
      environment: process.env.STORAGE_CDN_ENVIRONMENT,
      team: process.env.STORAGE_CDN_TEAM,
      path: process.env.STORAGE_CDN_PATH,
    },
  },
};

export default config as Config;
