import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react";
import PrintableCourtesy from "../printable-courtesy";
import { useReactToPrint } from 'react-to-print';

interface CourtesyRow {
    id: number,
    ministry: string,
    product: string,
    quantity: number,
    creationDate: Date,
}


export default function CourtesyRow(props: CourtesyRow) {

    const componentRef = useRef<HTMLDivElement | null>(null);


    const formatDate = (date: Date): string => {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const optionsDate: Intl.DateTimeFormatOptions = {
            day: '2-digit', month: '2-digit', year: 'numeric'
        };
        const optionsTime: Intl.DateTimeFormatOptions = {
            hour: '2-digit', minute: '2-digit', hour12: false
        };
        return `${date.toLocaleDateString('pt-BR', optionsDate)} ${date.toLocaleTimeString('pt-BR', optionsTime)}`;
    };


    const reprintCourtesy = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Relatório de Impressão',
        onBeforeGetContent: () => {
            if (componentRef.current) {
                componentRef.current.style.width = '58mm';
            }
            return Promise.resolve();
        },
    });


    return (
        <>

            <div className="flex justify-between border-b p-2">
                <div className={`flex-1 text-left`}>
                    {props.id}
                </div>
                <div className={`flex-1 text-left`}>
                    {props.ministry}
                </div>
                <div className={`flex-1 text-left`}>
                    {props.product}
                </div>
                <div className={`flex-1 text-left`}>
                    {props.quantity}
                </div>
                <div className={`flex-1 text-left`}>
                    {formatDate(props.creationDate)}
                </div>
                <div className={`flex-1 text-right`}>
                    <button className="border rounded px-2 py-1 bg-blue-600 text-white" type="button" onClick={reprintCourtesy} ><FontAwesomeIcon icon={faPrint} /></button>
                </div>
            </div>
            <div className="hidden">
                <div ref={componentRef}>
                    <PrintableCourtesy id={props.id} ministry={props.ministry} product={props.product} creationDate={formatDate(props.creationDate)} />
                </div>
            </div>

        </>

    )
}