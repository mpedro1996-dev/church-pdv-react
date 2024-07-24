import React, { forwardRef } from 'react';
import PrintableFooter from './printable-footer';
import PrintableProductHeader from './printable-product-header';
import PrintableLogo from './printable-logo';
import CurrencyFormatter from './currency-formatter';

interface PrintableSaleProps{
    sale:any    
}

const PrintableSale = forwardRef<HTMLDivElement, PrintableSaleProps>((props, ref) => {

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

    const {sale} = props;    

    let total = 0;
    
    if(sale !== null){

        total = sale.saleItems.reduce((total: number, saleItem: any)=>{

            return total + (saleItem.unitPrice * saleItem.quantity);

        },0)
    }


    
   

    return (
        <div ref={ref} className="w-[48mm] h-[210mm] p-1 flex flex-col">
            <PrintableLogo/>           
            {/* Informações da cortesia */}
            <div className="flex flex-col border-b border-black">
                <h1 className="text-lg font-bold">Venda: #{sale?.id}</h1>
                <h2 className="text-sm font-bold">Data:{formatDate(sale?.creationDate)}</h2>
            </div>
            <PrintableProductHeader/>          
            {/*Produtos*/}
            {sale?.saleItems.map((saleItem:any,index:number) => (
            <div key={index} className="flex gap-1 py-2 items-start border-b border-black">
                <p className="text-sm"><span className="font-bold">{saleItem.quantity}x</span> {saleItem.name} | <CurrencyFormatter value={saleItem.unitPrice * saleItem.quantity}/></p>
               
            </div>
            ))}
            <div className="flex border-b justify-between items-center border-black">
                <h1 className="text-sm font-bold">Total:</h1>
                <h2 className="text-sm font-bold"><CurrencyFormatter value={total}/></h2>
            </div>
            <PrintableFooter/>   
        </div>
    );
});

PrintableSale.displayName = 'PrintableSale';

export default PrintableSale;
