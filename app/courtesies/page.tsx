'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexTableHeaders from "../components/flex-table-headers";
import FlexTable from "../components/flex-table-headers";
import FlexTableRow from "../components/flex-table-row";
import Navbar from "../components/navbar"
import Product from "../components/product";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewCourtesy from "../components/new-courtesy";
import { useEffect, useState } from "react";

interface Courtesy {
    ministry: string,
    product: string,
    quantity: number
}


export default function Courtesies(){

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    
    const closeModal = () => setModalOpen(false);


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
        {modalOpen && <NewCourtesy closeModal={closeModal}/>}      
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-row w-full items-start justify-center">       
                <div className="w-6/12 p-2">
                    <div className="flex flex-row-reverse mb-2">
                        <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1" onClick={openModal}><FontAwesomeIcon icon={faPlus}/>Emitir cortesias</button>
                    </div>

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