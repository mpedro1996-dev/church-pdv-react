'use client'
import FlexTableHeaders from "../components/flex-table-headers";
import FlexTable from "../components/flex-table-headers";
import FlexTableRow from "../components/flex-table-row";
import Navbar from "../components/navbar"
import Product from "../components/product";

interface Courtesy {
    ministry: string,
    product: string,
    quantity: number
}


export default function Courtesies(){
    const headers = [
        "Ministério",
        "Produto",
        "Quantidade"
    ];

    const data = [
        {ministry: "MKG", product: "Pizza-frita + refri", quantity: 2},
        {ministry: "MAC", product: "Pizza-frita + refri", quantity: 3}
    ]





    return (
    <> 
        
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-row w-full items-start justify-center">       
                <div className="w-6/12 p-2">
                    <div className="flex flex-col border rounded">
                    <FlexTableHeaders headers={headers}/>                        
                    {data.map((courtesy, index) => (<FlexTableRow isLast={(index+1) == data.length} key={index} cells={[courtesy.ministry,courtesy.product,courtesy.quantity+""]}/>))}
                        
                    
                    </div>
                </div>
            </div>
        </div> 
    </>

    );
}