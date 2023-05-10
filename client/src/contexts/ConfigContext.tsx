import React, {createContext, FC, ReactNode} from 'react';
import getConfig from "next/config";
import {ConfigTypes} from "@models/configs";

type ConfigProviderProps = {
  children: ReactNode;
};

const ConfigContext = createContext<ConfigTypes>({} as ConfigTypes );

export const useConfig = () : ConfigTypes => {
  return React.useContext(ConfigContext);
};

export const getConfigWithTypes = () : ConfigTypes => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig as ConfigTypes;
};

const ConfigProvider: FC<ConfigProviderProps> = ({ children}) => {
  const { publicRuntimeConfig } = getConfig();
  return <ConfigContext.Provider value={publicRuntimeConfig}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
