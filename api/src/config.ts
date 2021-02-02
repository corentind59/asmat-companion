import AWS from 'aws-sdk';

const SSM = new AWS.SSM();
const BASE_PARAM_TREE = (() => {
  const paramPath = process.env.EXPRESS_AWS_SSM_CONFIG_PATH;
  if (!paramPath) {
    throw new Error('No base path provided for SSM config.');
  }
  return paramPath;
})();

interface Configuration {
  databaseURL: string;
}

export const getConfig = (() => {
  let config: Configuration | null = null;
  return async () => {
    if (!config) {
      const params = await SSM.getParametersByPath({
        Path: BASE_PARAM_TREE,
        WithDecryption: true
      }).promise();
      config = params.Parameters!.reduce((result, { Name, Value }) => ({
        ...result,
        [Name!.replace(new RegExp(`${BASE_PARAM_TREE}\/?`), '')]: Value
      }), {}) as Configuration;
    }
    return config;
  };
})();
