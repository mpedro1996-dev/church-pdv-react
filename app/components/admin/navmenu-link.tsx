; import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";

interface NavMenuLinkProps extends ComponentProps<'a'> {
    Icon: IconDefinition;
    Label: string;
    Selected: boolean;
}

export default function NavMenuLink(props: NavMenuLinkProps) {


    return (
        <a {...props} className={`flex border-b gap-1 p-2 ${props.Selected ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}>
            <div className="flex items-center justify-center w-6">
                <FontAwesomeIcon icon={props.Icon} />
            </div>

            <div className="flex items-center justify-center text-center">
                {props.Label}
            </div>

        </a>
    );
}