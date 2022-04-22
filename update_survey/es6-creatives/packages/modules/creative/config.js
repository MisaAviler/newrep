let config = {};

export const setConfig = cfg => config = Object.assign({}, config, cfg);

export const getConfig = () => config;
