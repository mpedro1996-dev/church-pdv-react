'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Navbar from "../components/navbar"
import { faLock, faPlus, faPrint } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect, useState } from "react"
import { api, registerLoadingIndicator } from "../lib/axios"
import { useTokenStore } from "../lib/zustand"
import Loading from "../components/loading"
import CurrencyFormatter from "../components/currency-formatter"

export default function CashFlows(){

    const { token } = useTokenStore();
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true); 
    const [code, setCode] = useState("");
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        // Registrar a função setLoading no interceptor
        registerLoadingIndicator(setLoading);
        setLoadingPage(false);
    }, []);  

    const openModal = () => setModalOpen(true);
    
    const closeModal = () => {
      setModalOpen(false);
      
    } 


    const GetCashFlows = useCallback(async() => {
  
        if (!token) {
          console.error('No token found');
          return;
        }
  
        try {
          const response = await api.get('/api/cash-flows', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const result = response.data;

            
          if (result.isSuccess) {
                        
          }
        } catch (error) {
          console.error('GetCashFlows failed!', error);
        }
      },[token])



    useEffect(() => {
       
        GetCashFlows();
    
    }, [GetCashFlows]);





      


      const handleDescriptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
      };




    return(
        <>
        {loadingPage && <Loading message={"Carregando..."}/>}
        {loading && <Loading message={"Carregando..."}/>}

        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-row w-full items-start justify-center">       
                <div className="w-8/12 p-2">
                    <div className="flex flex-row gap-2 mb-2">                    
                        <div className="flex flex-col">
                            <label>Código da venda:</label>
                            <input type="text" name="code" className="w-full" onChange={handleDescriptionChange} value={code} />

                        </div>                        
                    </div>
                    <div className="flex flex-col border rounded">
                        {/*Sumário */}
                        <div className="flex justify-between items-center p-2 border-b">                          
                            <h1><span className="font-bold">Dinheiro:</span></h1>
                            <h1><span className="font-bold">Debito:</span> </h1>
                            <h1><span className="font-bold">Crédito:</span> </h1>
                            <h1><span className="font-bold">Pix:</span></h1>
                            <h1><span className="font-bold">Fiado:</span></h1>
                            <div className="">
                                <button type="button" className="text-white bg-blue-500 border rounded border-blue-400 p-2 flex items-center gap-1" onClick={() => openModal()} ><FontAwesomeIcon icon={faPrint}/></button>
                            </div>
                        </div>    
                        
                   
                    </div>
                </div>
            </div>
        </div> 
        </>
    
    


    )
}