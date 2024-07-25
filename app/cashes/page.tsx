'use client'


import { useCallback, useEffect, useState } from "react"
import { api, registerLoadingIndicator } from "../lib/axios"
import { useCashStore, useTokenStore } from "../lib/zustand"
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import CurrencyFormatter from "../components/currency-formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import CashRow from "../components/cash-row";


export default function CashFlows(){

    const { token } = useTokenStore();
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const {cashes, setCashes} = useCashStore()


    useEffect(() => {
        // Registrar a função setLoading no interceptor
        registerLoadingIndicator(setLoading);
        setLoadingPage(false);
    }, []);    


    const GetCashes = useCallback(async() => {
  
        if (!token) {
          console.error('No token found');
          return;
        }
  
        try {
          const response = await api.get('/api/cashes', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const result = response.data;

          if (result.isSuccess) {
              setCashes(result.value);            
          }
        } catch (error) {
          console.error('GetCashes failed!', error);
        }
      },[token,setCashes])



    useEffect(() => {
       
        GetCashes();
    
    }, [GetCashes]);


    return(
        <>
        {loadingPage && <Loading message={"Carregando..."}/>}
        {loading && <Loading message={"Carregando..."}/>}

        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-row w-full items-start justify-center">       
                <div className="w-8/12 p-2">
                    
                    <div className="flex flex-col border rounded">
                        {cashes.map((cash) =>(
                            <CashRow key={cash.id} cash={cash}/>
                        ))}
                         
                    </div>
                </div>
            </div>
        </div> 
        </>
    
    


    )
}