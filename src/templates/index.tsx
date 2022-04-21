import { DefaultThemeRenderContext, PageEvent, ProjectReflection, JSX } from "typedoc"

export const indexTemplate = ({ markdown }: DefaultThemeRenderContext, props: PageEvent<ProjectReflection>) => (
    <div class="tsd-panel tsd-typography">
        <JSX.Raw html={markdown(props.model.readme)} />
    </div>
);