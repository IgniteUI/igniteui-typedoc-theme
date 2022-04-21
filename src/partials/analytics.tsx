import { DefaultThemeRenderContext, JSX } from "typedoc";
import { getConfigData } from "../utils/lib";

export function analytics(context: DefaultThemeRenderContext) {
    const gaID = getConfigData(context, "gaID");
    const gaSite = getConfigData(context, "gaSite");
    if (!gaID) return;

    const script = `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${gaID}', '${gaSite}');
ga('send', 'pageview');
`.trim();

    return (
        <script>
            <JSX.Raw html={script} />
        </script>
    );
}