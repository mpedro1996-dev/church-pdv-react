import React, { forwardRef } from 'react';
import PrintableFooter from './printable-footer';
import PrintableProductHeader from './printable-product-header';
import PrintableLogo from './printable-logo';

interface PrintableCourtesyProps{
    id: number,
    product: string,
    ministry: string,
    creationDate: string    
}

const PrintableCourtesy = forwardRef<HTMLDivElement, PrintableCourtesyProps>((props, ref) => {

    const {id, product, ministry, creationDate} = props;

    return (
        <div ref={ref} className="w-[48mm] h-[210mm] p-1 flex flex-col">
            <PrintableLogo/>           
            {/* Informações da cortesia */}
            <div className="flex flex-col border-b border-black">
                <h1 className="text-lg font-bold">Lote: #{id}</h1>
                <h2 className="text-sm font-bold">Data:{creationDate}</h2>
                <h2 className="text-sm font-bold">Ministério: {ministry}</h2>
            </div>
            <PrintableProductHeader/>          
            {/*Produtos*/}
            <div className="flex gap-1 py-2 items-start border-b border-black">
                <p className="text-sm font-bold">1x</p>
                <p className="flex-1 text-sm">{product}</p>
            </div>
            <PrintableFooter/>   
        </div>
    );
});

PrintableCourtesy.displayName = 'PrintableCourtesy';

export default PrintableCourtesy;


