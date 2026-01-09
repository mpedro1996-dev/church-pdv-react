import { ComponentProps } from "react";

interface AnchorProps extends ComponentProps<'a'>{

}


export default function NavLink(props:AnchorProps){
    return(
        <a {...props} className="flex items-center gap-1 hover:text-blue-300">{props.children}</a>    
    );
}