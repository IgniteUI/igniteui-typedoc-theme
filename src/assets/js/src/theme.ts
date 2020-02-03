import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as process from 'process';
import * as path from 'path';

import { DefaultTheme } from 'typedoc';
import { PageEvent, RendererEvent } from 'typedoc/dist/lib/output/events';
import { Renderer } from 'typedoc';

export default class EnvironmentLinkSetup extends DefaultTheme {

    constructor(renderer: Renderer, basePath) {
        super(renderer, basePath);

        this.listenTo(renderer, RendererEvent.BEGIN, this.onRenderingBegin);
    }

    private onRenderingBegin() {
      this.owner.theme.resources.deactivate();
      this.owner.theme.resources.helpers.addOrigin('getConfigData', path.join(this.basePath, 'helpers'));
      this.owner.theme.resources.activate();
    }
}
