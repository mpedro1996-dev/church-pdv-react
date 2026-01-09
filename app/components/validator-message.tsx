import { ComponentProps } from "react";

interface SpanProps extends ComponentProps<'span'>{

}

export default function ValidatorMessage(props : SpanProps){
    return(
        <span {...props} className="text-red-600 text-xs font-semibold w-full">{props.children}</span>
    )
}