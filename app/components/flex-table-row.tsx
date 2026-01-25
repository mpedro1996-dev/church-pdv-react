import { ReactNode } from "react";

interface FlexTableRowProps {
    children: ReactNode,
    active: boolean,
}
export default function FlexTableRow(props: FlexTableRowProps) {

    return (
        <div className={`flex flex-row border-b p-2 items-center ${props.active ? '' : 'bg-gray-200'}`}>
            {props.children}
        </div>
    );
}