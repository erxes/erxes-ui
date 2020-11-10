import T from "i18n-react";
import urlParser from "./urlParser";

export const getEnv = (): any => {
  const envs = {};

  for (const envMap of (window as any).envMaps) {
    envs[envMap.name] = localStorage.getItem(`erxes_env_${envMap.name}`);
  }

  return envs;
};

export const __ = (key: string, options?: any) => {
  const translation = T.translate(key, options);

  if (!translation) {
    return "";
  }

  return translation.toString();
};

export const readFile = (value: string): string => {
  if (!value || urlParser.isValidURL(value) || value.includes("/")) {
    return value;
  }

  const { REACT_APP_API_URL } = getEnv();

  return `${REACT_APP_API_URL}/read-file?key=${value}`;
};
