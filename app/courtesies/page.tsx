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
import { useCourtesyStore, useTokenStore } from "../lib/zustand";
import { api } from "../lib/axios";

interface Courtesy {
    ministry: string,
    product: string,
    quantity: number
}


export default function Courtesies(){

    const [modalOpen, setModalOpen] = useState(false);
    const {token} = useTokenStore();
    const {courtesies, setCourtesies} = useCourtesyStore();

    const openModal = () => setModalOpen(true);
    
    const closeModal = () => setModalOpen(false);


    const headers = [
        "Ministério",
        "Produto",
        "Quantidade"
    ];
    
    useEffect(() => {
        async function GetMinistries() {
  
          if (!token) {
            console.error('No token found');
            return;
          }
    
          try {
            const response = await api.get('/api/courtesies', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const result = response.data;
              
            if (result.isSuccess) {
                setCourtesies(result.value);
            }
          } catch (error) {
            console.error('GetMinistries failed!', error);
          }
        }
    
        GetMinistries();
      }, [token, setCourtesies]);


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
                        {courtesies.map((courtesy, index) => (<FlexTableRow isLast={(index+1) == courtesies.length} key={index} cells={[courtesy.ministry,courtesy.product,courtesy.quantity+""]}/>))}
                        
                    
                    </div>
                </div>
            </div>
        </div> 
    </>

    );
}