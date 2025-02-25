import React, { forwardRef } from 'react';
import PrintableFooter from './printable-footer';
import PrintableProductHeader from './printable-product-header';
import PrintableLogo from './printable-logo';
import CurrencyFormatter from './currency-formatter';
import { Cash } from '../lib/zustand';

interface PrintableCashProps{
    cash:Cash    
}

const PrintableCash = forwardRef<HTMLDivElement, PrintableCashProps>((props, ref) => {

    const formatDate = (date: Date | null): string => {
        if(date == null) return "";

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

    const {cash} = props;



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


    
   

    return (
        <div ref={ref} className="w-[48mm] h-[210mm] p-1 flex flex-col">
            <PrintableLogo/>           
            {/* Informações da cortesia */}
            <div className="flex flex-col border-b border-black">
                <h1 className="text-lg font-bold">Caixa: #{cash.id}</h1>
                <h2 className="text-sm font-bold flex flex-col">Data de abertura:<span className='text-xs'>{formatDate(cash.opennedDate)}</span></h2>
                <h2 className="text-sm font-bold flex flex-col">Data de fechamento:<span className='text-xs'>{cash.closedDate ? formatDate(cash.closedDate) : "-"}</span></h2>
                <h2 className="text-sm font-bold flex flex-col">Valor de abertura:<span className='text-xs'><CurrencyFormatter value={cash.opennedValue}/></span></h2>
                
            </div>
            {/*Produtos*/}
            <div className="flex flex-col border-b border-black py-1">
                <h1 className="text-xs font-bold flex gap-1 items-center">VALORES DE MOVIMENTO</h1>              
            </div>
            <h2><span className="font-bold">Dinheiro:</span> <CurrencyFormatter value={calculateCash()}/></h2>
            <h2><span className="font-bold">Debito:</span> <CurrencyFormatter value={calculateDebit()}/></h2>
            <h2><span className="font-bold">Crédito:</span> <CurrencyFormatter value={calculateCredit()}/></h2>
            <h2><span className="font-bold">Pix:</span> <CurrencyFormatter value={calculatePix()}/></h2>
            <h2><span className="font-bold">Fiado:</span> <CurrencyFormatter value={calculateConsumption()}/></h2>
            <div className="flex flex-col border-b border-t mt-1 border-black py-1">
                <h1 className="text-xs font-bold flex gap-1 items-center">VALORES DE FECHAMENTO</h1>              
            </div>
            <div className="border-b border-black">
                <h2><span className="font-bold">Dinheiro:</span> <CurrencyFormatter value={cash.cashValue}/></h2>
                <h2><span className="font-bold">Debito:</span> <CurrencyFormatter value={cash.debitValue}/></h2>
                <h2><span className="font-bold">Crédito:</span> <CurrencyFormatter value={cash.creditValue}/></h2>
                <h2><span className="font-bold">Pix:</span> <CurrencyFormatter value={cash.pixValue}/></h2>
                <h2><span className="font-bold">Fiado:</span> <CurrencyFormatter value={cash.consumptionValue}/></h2>
            </div>            
            
            <PrintableFooter/>   
        </div>
    );
});

PrintableCash.displayName = 'PrintableSale';

export default PrintableCash;
