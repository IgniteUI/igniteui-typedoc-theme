import { DefaultThemeRenderContext, PageEvent, Reflection, JSX } from "typedoc"
import { analytics } from "../partials/analytics"
import { footer } from "../partials/footer";
import { header } from "../partials/header";
import { navigation } from "../partials/navigation";
import { getConfigData, hasTypeParameters, join } from "../utils/lib";

export const defaultLayout = (context: DefaultThemeRenderContext, props: PageEvent<Reflection>) => {
    const defaultEnUrl = getConfigData(context, 'typedoc_default_url', 'en');
    const baseUrl = getConfigData(context, 'url');
    const apiJsonFile = getConfigData(context, 'versions');
    const searchPath = getConfigData(context, 'assets/js/search.json');
    const gaID = getConfigData(context, 'gaID');
    return (
        <html class="default no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                {context.hook("head.begin")}
                <meta http-equiv="x-ua-compatible" content="IE=edge" />
                <title>
                    {props.model.name === props.project.name ?
                        props.project.name :
                        `${props.model.name} | ${props.project.name}`}
                </title>
                <meta name="description" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="canonical" href={defaultEnUrl} />
                <link rel="alternate" href={defaultEnUrl} hreflang="en" />
                <link rel="alternate" href={defaultEnUrl} hreflang="en-us" />
                <link rel="alternate" href={defaultEnUrl} hreflang="x-default" />

                <link rel="stylesheet" href="https://infragistics.com/assets/modern/css/layout.css" />
                <link rel="stylesheet" href="https://infragistics.com/assets/modern/css/animate-custom.css" />
                <link rel="stylesheet" href="https://infragistics.com/assets/modern/css/fontello.css" />
                <link rel="stylesheet" href="https://infragistics.com/css/navigation.css" />
                <link rel="stylesheet" href="https://infragistics.com/css/footer.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="https://use.typekit.net/zhy2hpz.css" />
                <link rel="stylesheet" href={context.relativeURL("assets/css/main.css")} />

                <script async src={context.relativeURL("assets/search.js")} id="search-script"></script>

                {analytics(context)}
                {context.hook("head.end")}
            </head>
            <body id="body" data-base-url={baseUrl} data-api-versions-json={apiJsonFile}>
                {context.hook('body.begin')}
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe src={`https://www.googletagmanager.com/ns.html?id=${gaID}`}
                        height={0} width={0} style="display:none;visibility:hidden"></iframe>
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {header(context, props)}
                <div class="container container-main">
                    <div class="row">
                        <div class="col-2 col-menu menu-sticky-wrap menu-highlight">
                            <div class="table-cell" id="tsd-search" data-index={searchPath} data-base={context.relativeURL("./")}>
                                <div class="field">
                                    <label for="tsd-search-field" class="material-icons">search</label>
                                    <input id="tsd-search-field" type="text" placeholder="Search API" />
                                </div>
                                <ul class="results">
                                    <li class="state loading">Preparing search index...</li>
                                    <li class="state failure">The search index is not available</li>
                                </ul>
                            </div>
                            <div id="tsd-filter">
                                <div class="tsd-filter-group">
                                    <div class="tsd-select" id="tsd-filter-visibility">
                                        <span class="tsd-select-label">All</span>
                                            <ul class="tsd-select-list">
                                                <li data-value="public">Public</li>
                                                <li data-value="protected">Public/Protected</li>
                                                <li data-value="private" class="selected">All</li>
                                            </ul>
                                    </div>
                                    <input type="checkbox" id="tsd-filter-inherited" checked />
                                    <label class="tsd-widget" for="tsd-filter-inherited">Inherited</label>

                                    {!context.options.getValue("excludeExternals") && (
                                    <>
                                        <input type="checkbox" id="tsd-filter-externals" checked={true} />
                                        <label class="tsd-widget" for="tsd-filter-externals">Externals</label>
                                    </>
                                    )}
                                    {!context.options.getValue("excludeExternals") && (
                                    <>
                                        <input type="checkbox" id="tsd-filter-externals" />
                                        <label class="tsd-widget" for="tsd-filter-only-exported">Only exported</label>
                                    </>
                                    )}
                                </div>
                            </div>
                            {navigation(context, props)}
                        </div>
                        <div class="col-10 col-content">
                            <div class="tsd-page-title">
                                <div class="container">
                                    {!!props.model.parent && <ul class="tsd-breadcrumb">{context.breadcrumb(props.model)}</ul>}
                                    <h1>
                                        {props.model.kindString !== "Project" && `${props.model.kindString ?? ""} `}
                                        {props.model.name}
                                        {hasTypeParameters(props.model) && (
                                            <>
                                                {"<"}
                                                {join(", ", props.model.typeParameters, (item) => item.name)}
                                                {">"}
                                            </>
                                        )}
                                    </h1>
                                </div>
                            </div>
                            {props.template(props)}
                        </div>
                    </div>
                </div>

                {footer(context, props)}

                <div class="overlay"></div>
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
                <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js" integrity="sha256-8WqyJLuWKRBVhxXIL1jBDD7SDxU936oZkCnxQbWwJVw=" crossOrigin="anonymous"></script>
                <script type="text/javascript" src="https://infragistics.com/assets/modern/scripts/jquery-migrate.min.js"></script>
                <script type="text/javascript" src="https://www.infragistics.com/assets/modern/scripts/plugins.nav.js"></script>
                <script type="text/javascript" src="https://www.infragistics.com/assets/modern/scripts/navigation.js"></script>
                <script src="https://unpkg.com/lunr/lunr.js"></script>
                <script src={context.relativeURL("assets/main.js")}></script>

                {context.hook("body.end")}
            </body>
        </html>
    );
}