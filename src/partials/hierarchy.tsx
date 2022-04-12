import { DeclarationHierarchy, DefaultThemeRenderContext, JSX } from 'typedoc';

export const hierarchy = (context: DefaultThemeRenderContext, props: DeclarationHierarchy) => (
    <ul class="tsd-hierarchy">
        {props.types.map((item, i, l) => (
            <li>
                {props.isTarget ? <span class="target">{item.toString()}</span> : context.type(item)}
                {i === l.length - 1 && !!props.next && context.hierarchy(props.next)}
            </li>
        ))}
    </ul>
)