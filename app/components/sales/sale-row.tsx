import { faPrint, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { Sale, useSaleStore, useTokenStore } from "../../lib/zustand";
import CurrencyFormatter from "../currency-formatter";
import PrintableSale from "../printable-sale";
import PaymentRow from "../payment-row";
import { api } from "@/app/lib/axios";
import { useRouter } from "next/navigation";


interface SaleRowProps {
    sale: Sale,
    actionButton: (id: number, paymentType: number) => void;
    dimissButton: () => void;
}


export default function SaleRow(props: SaleRowProps) {

    const componentRef = useRef<HTMLDivElement | null>(null);

    const { sale } = props;

    const router = useRouter();

    const { token } = useTokenStore();
    const { sales, setSales } = useSaleStore();


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


    const printSale = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Relatório de Impressão',
        onBeforeGetContent: () => {
            if (componentRef.current) {
                componentRef.current.style.width = '58mm';
            }
            return Promise.resolve();
        },
    });

    async function cancelSale(id: number) {
        try {


            const response = await api.delete(`/api/sales/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = response.data;

            if (result.isSuccess) {
                setSales(sales.filter(sale => sale.id !== id));

            }

        }
        catch (error) {
            console.error(error);

        }


    }
    const calculateTotal = () => {
        return sale.payments.reduce((total, payment) => {


            return total + payment.value;


        }, 0);
    }


    return (
        <>
            <div className="flex justify-start items-center p-2 border-b text-white bg-zinc-400 gap-5">
                <h1 className="flex"><span className="font-bold">#{sale.code}</span></h1>
                <h1 className="flex gap-2"><span className="font-bold">Data:</span>{formatDate(sale.creationDate)}</h1>
                <h1 className="flex flex-1 gap-2"><span className="font-bold">Total:</span><CurrencyFormatter value={calculateTotal()} /></h1>
                <div className="flex gap-1">
                    {sale.canCancel && <button type="button" className="text-white bg-red-600 border rounded border-red-400 p-2 flex items-center gap-1" onClick={() => cancelSale(sale.id)}><FontAwesomeIcon icon={faXmark} /></button>}
                    <button type="button" className="text-white bg-blue-500 border rounded border-blue-400 p-2 flex items-center gap-1" onClick={() => printSale()}><FontAwesomeIcon icon={faPrint} /></button>
                </div>

            </div>
            <div className="flex flex-col p-2 border-b">
                {sale.payments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} actionButton={props.actionButton} />
                ))}

            </div>
            <div className="hidden">
                <div ref={componentRef}>
                    <PrintableSale sale={sale} />
                </div>
            </div>

        </>

    )
}