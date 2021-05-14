import * as path from 'path';
import * as fs from 'fs';

export function getConfigData(prop: string, lang) {
    const fileName = 'config.json';
    let config;
    let data;

    if (this.settings && fs.existsSync(this.settings.theme)) {
        const normalizedPath = path.join(this.settings.theme, fileName);
        config = JSON.parse(fs.readFileSync(normalizedPath, 'utf8'));
    }

    const settingOpt = this.settings && this.settings.localize ? this.settings.localize : 'en';
    const extractedLang = lang.name ? settingOpt : lang;

    // console.log('config: ', config);
    // console.log('extractedLang: ', extractedLang);
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    if (config && extractedLang && process.env.NODE_ENV) {
        data = config[extractedLang][process.env.NODE_ENV.trim()];
    }

    const res = data ? data[prop] : ''; 
    // console.log('data[prop]', res);
    return res;
}