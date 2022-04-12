import {DefaultThemeRenderContext, JSX, TypeParameterReflection} from 'typedoc';


export function typeParameters(context: DefaultThemeRenderContext, typeParameters: TypeParameterReflection[]) {
    return (
        <ul class="tsd-type-parameters">
            {typeParameters?.map((item) => (
                <li>
                    <h4>
                        {item.name}
                        {!!item.type && (
                            <>
                                <span class="tsd-signature-symbol">{": "}</span>
                                {context.type(item.type)}
                            </>
                        )}
                        {!!item.default && (
                            <>
                                {" = "}
                                {context.type(item.default)}
                            </>
                        )}
                    </h4>
                    {context.comment(item)}
                </li>
            ))}
        </ul>
    );
}