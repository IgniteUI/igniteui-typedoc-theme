import { DeclarationReflection, DefaultThemeRenderContext, JSX, ReferenceReflection } from 'typedoc';

export const member = (context: DefaultThemeRenderContext, props: DeclarationReflection) => (
    <section class={"tsd-panel tsd-member " + props.cssClasses}>
        {props.signatures
            ? context.memberSignatures(props)
            : props.hasGetterOrSetter()
            ? context.memberGetterSetter(props)
            : props instanceof ReferenceReflection
            ? context.memberReference(props)
            : context.memberDeclaration(props)}

        {props.groups?.map((item) => item.children.map((item) => !item.hasOwnDocument && context.member(item)))}
    </section>
);