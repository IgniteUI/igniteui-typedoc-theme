import { classNames, wbr } from '../utils/lib';
import {DefaultThemeRenderContext, JSX, DeclarationReflection, PageEvent, Reflection, ReflectionKind, ContainerReflection} from 'typedoc';

export function navigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
    return (
        <>
            {primaryNavigation(context, props)}
            {secondaryNavigation(context, props)}
        </>
    );
}

function primaryNavigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {

    const modules = props.model.project.getChildrenByKind(ReflectionKind.SomeModule);
    const projectLinkName = modules.some((m) => m.kindOf(ReflectionKind.Module)) ? "Modules" : "Exports";

    return (
        <nav class="tsd-navigation primary">
            <ul>
                <li class={classNames({ current: props.model.isProject() })}>
                    <a href={context.urlTo(props.model.project)}>{projectLinkName}</a>
                </li>
            </ul>
        </nav>
    );
}

function secondaryNavigation(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
    const children = props.model instanceof ContainerReflection ? props.model.children || [] : [];

    if (props.model.isProject() && props.model.getChildrenByKind(ReflectionKind.Module).length) {
        return;
    }

    const pageNavigation = (
        <ul>
            {children
                .filter((child) => !child.kindOf(ReflectionKind.SomeModule))
                .map((child) => {
                    return (
                        <li class={child.cssClasses}>
                            <a href={context.urlTo(child)} class="tsd-kind-icon">
                                {wbr(child.name)}
                            </a>
                        </li>
                    );
                })}
        </ul>
    );

    if (props.model.kindOf(ReflectionKind.SomeModule | ReflectionKind.Project)) {
        return <nav class="tsd-navigation secondary menu-sticky">{pageNavigation}</nav>;
    }

    return (
        <nav class="tsd-navigation secondary menu-sticky">
            <ul>
                <li class={"current " + props.model.cssClasses}>
                    <a href={context.urlTo(props.model)} class="tsd-kind-icon">
                        {wbr(props.model.name)}
                    </a>
                    {pageNavigation}
                </li>
            </ul>
        </nav>
    );
} 