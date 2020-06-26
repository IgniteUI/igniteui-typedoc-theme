import { PageEvent } from "typedoc/dist/lib/output/events";
import * as path from 'path';
import * as fs from 'fs';

export function getConfigData(prop: string, lang) {
  const fileName = 'config.json';
  let settings;
  let config;
  let data;

  if (this instanceof PageEvent) {
      settings = this.settings;
  }

  if (settings && fs.existsSync(settings.theme)) {
      const normalizedPath = path.join(settings.theme, fileName);
      config = JSON.parse(fs.readFileSync(normalizedPath, 'utf8'));
  }

  const settingOpt = settings === undefined && settings.localize === undefined ? 'en' : settings.localize;
  const getLang = lang.name ? settingOpt : lang;
  
  if (config && getLang && process.env.NODE_ENV) {
      data = config[getLang][process.env.NODE_ENV.trim()];
  }

  return data ? data[prop] : '';
}