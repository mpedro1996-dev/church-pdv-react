import { faLock, faPrint, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react";
import PrintableCourtesy from "./printable-courtesy";
import { useReactToPrint } from 'react-to-print';
import Product from "./product";
import { Cash } from "../lib/zustand";
import PrintableCash from "./printable-cash";
import CurrencyFormatter from "./currency-formatter";

interface CashRowProps{
   cash:Cash
}


export default function CashRow(props:CashRowProps){
    
    const componentRef = useRef<HTMLDivElement | null>(null);

    const {cash} = props;


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

    
      const printCash = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Relatório de Impressão',
        onBeforeGetContent: () => {
          if (componentRef.current) {
            componentRef.current.style.width = '58mm';           
          }
          return Promise.resolve();
        },
      });

    const calculateCash = () => {
        return cash.cashFlows.reduce((totalCash, cashFlow) => {

            if((cashFlow.paymentType == 1 && cashFlow.type != 4)  || cashFlow.type == 0 || cashFlow.type == 3)
            {
                return totalCash + cashFlow.value;
            }
            if(cashFlow.type == 1 || (cashFlow.paymentType == 1 && cashFlow.type == 4))
            {

                return totalCash - cashFlow.value;
            }
            else
            {
                return totalCash + 0;
            }

        }, 0);
    }

    const calculateDebit = () => {
        return cash.cashFlows.reduce((totalDebit, cashFlow) => {

            if((cashFlow.paymentType == 2 && cashFlow.type != 4))
            {
                return totalDebit + cashFlow.value;
            }
            if(cashFlow.paymentType == 2 && cashFlow.type == 4)
            {

                return totalDebit - cashFlow.value;
            }
            else
            {
                return totalDebit + 0
            }

        }, 0);
    }

    const calculateCredit = () => {
        return cash.cashFlows.reduce((totalCredit, cashFlow) => {

            if((cashFlow.paymentType == 3 && cashFlow.type != 4))
            {
                return totalCredit + cashFlow.value;
            }
            if(cashFlow.paymentType == 3 && cashFlow.type == 4)
            {

                return totalCredit - cashFlow.value;
            }
            else
            {
                return totalCredit + 0
            }

        }, 0);
    }

    const calculatePix = () => {
        return cash.cashFlows.reduce((totalPix, cashFlow) => {

            if((cashFlow.paymentType == 4 && cashFlow.type != 4))
            {
                return totalPix + cashFlow.value;
            }
            if(cashFlow.paymentType == 4 && cashFlow.type == 4)
            {
                return totalPix - cashFlow.value;
            }
            else
            {
                return totalPix + 0
            }

        }, 0);
    }

    const calculateConsumption = () => {
        return cash.cashFlows.reduce((totalConsumption, cashFlow) => {

            if(cashFlow.paymentType == 5 && cashFlow.type != 4)
            {
                return totalConsumption + cashFlow.value;
            }
            if(cashFlow.paymentType == 5 && cashFlow.type == 4)
            {
                return totalConsumption - cashFlow.value;
            }
            else
            {
                return totalConsumption + 0
            }

        }, 0);
    }

    return(
        <>
            <div className="flex justify-start items-center p-2 border-b text-white bg-zinc-400 gap-5">                          
                <h1 className="flex"><span className="font-bold">#{cash.id}</span></h1>
                <h1 className="flex gap-2"><span className="font-bold">Data de abertura:</span>{formatDate(cash.opennedDate)}</h1>
                <h1 className="flex gap-2"><span className="font-bold">Data de fechamento:</span>{cash.closedDate ? formatDate(cash.closedDate):"-"}</h1>
              
            </div> 
            <div className="flex justify-between items-center p-2 border-b">                          
                <h1 className="flex flex-col"><span className="font-bold">Dinheiro:</span> <CurrencyFormatter value={calculateCash()}/></h1>
                <h1 className="flex flex-col"><span className="font-bold">Debito:</span> <CurrencyFormatter value={calculateDebit()}/></h1>
                <h1 className="flex flex-col"><span className="font-bold">Crédito:</span> <CurrencyFormatter value={calculateCredit()}/></h1>
                <h1 className="flex flex-col"><span className="font-bold">Pix:</span> <CurrencyFormatter value={calculatePix()}/></h1>
                <h1 className="flex flex-col"><span className="font-bold">Fiado:</span> <CurrencyFormatter value={calculateConsumption()}/></h1>
                <h1 className={`flex flex-col ${cash.closedDate ? 'text-red-600' : 'text-green-600'}`}><FontAwesomeIcon icon={cash.closedDate?faLock:faUnlock}/></h1>
                <button type="button" className="text-white bg-blue-500 border rounded border-blue-400 p-2 flex items-center gap-1" onClick={() => printCash()}><FontAwesomeIcon icon={faPrint}/></button>
            </div> 
            <div className="hidden">
                <div ref ={componentRef}>
                    <PrintableCash cash={cash}/>
                </div>
            </div>            
            
        </>
        
    )
}