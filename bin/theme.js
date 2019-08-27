"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Handlebars = require("handlebars");
const process = require("process");
const path = require("path");
const typedoc_1 = require("typedoc");
const events_1 = require("typedoc/dist/lib/output/events");
class EnvironmentLinkSetup extends typedoc_1.DefaultTheme {
    constructor(renderer, basePath) {
        super(renderer, basePath);
        Handlebars.registerHelper('getConfigData', this.getConfigData);
    }
    getConfigData(prop, lang) {
        const fileName = 'config.json';
        let settings;
        let config;
        let data;
        if (this instanceof events_1.PageEvent) {
            settings = this.settings;
        }
        if (settings && fs.existsSync(settings.theme)) {
            const normalizedPath = path.join(settings.theme, fileName);
            config = JSON.parse(fs.readFileSync(normalizedPath, 'utf8'));
        }
        const getLang = lang.name ? settings.localize : lang;
        if (config && getLang && process.env.NODE_ENV) {
            data = config[getLang][process.env.NODE_ENV.trim()];
        }
        return data ? data[prop] : '';
    }
}
exports.default = EnvironmentLinkSetup;
