import { DefaultThemeRenderContext, PageEvent, Reflection, JSX } from 'typedoc';
import { infraNav } from './infranav';

export const header = (context: DefaultThemeRenderContext, props: PageEvent<Reflection>) => {
    return (
        <header class="tsd-header">
            {infraNav(context, props)}
            <div class="tsd-header-content">
                <div class="tsd-header-group">
                    <h1 class="tsd-header-logo">
                        <a href="https://www.infragistics.com/products/ignite-ui-angular" class="title">{props.project.name}</a> 
                        <span class="version">
                            <select id="versions"></select>
                        </span>
                    </h1>
                    <div class="tsd-nav-toggle">
                        <input id="tsd-toggle-cbx" type="checkbox" />
                        <label for="tsd-toggle-cbx">
                            <span class="material-icons">menu</span>
                        </label>
                        <ul class="tsd-nav">
                            <li class="tsd-nav-item">
                                <button class="tsd-button--flat">
                                    <a href="https://www.infragistics.com/products/ignite-ui-angular">Components</a>
                                </button>
                            </li>
                            <li class="tsd-nav-item">
                                <button class="tsd-button">
                                    <a href="https://infragistics.com/products/ignite-ui-angular/getting-started/">Get Started</a>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
