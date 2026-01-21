import { ReactNode } from "react";

interface FlexTableRowProps {
    children: ReactNode;
}
export default function FlexTableRow(props: FlexTableRowProps) {

    return (
        <div className="flex flex-row border-b p-2 items-center">
            {props.children}
        </div>
    );
}