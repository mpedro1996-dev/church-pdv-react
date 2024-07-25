'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Navbar from "../components/navbar"
import { faLock, faPlus } from "@fortawesome/free-solid-svg-icons"
import CurrencyInput from "../components/currency-input"
import { useEffect, useState } from "react"
import { api, registerLoadingIndicator } from "../lib/axios"
import { useCashFlowStore, useTokenStore } from "../lib/zustand"
import CashFlowRow from "../components/cash-flow-row"
import Loading from "../components/loading"
import CurrencyFormatter from "../components/currency-formatter"

export default function CashFlows(){

    const { token } = useTokenStore();
    const { cashFlows, setCashFlows} = useCashFlowStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Registrar a função setLoading no interceptor
        registerLoadingIndicator(setLoading);
    }, []);


    useEffect(() => {
        async function GetCashFlows() {
  
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
                setCashFlows(result.value);
                console.log(result.value);
              
            }
          } catch (error) {
            console.error('GetCashFlows failed!', error);
          }
        }

        GetCashFlows();
    
      }, [token, setCashFlows]);



      const calculateCash = () => {
        return cashFlows.reduce((totalCash, cashFlow) => {

            if(cashFlow.paymentType == 1  || cashFlow.type == 0)
            {
                return totalCash + cashFlow.value;
            }
            if(cashFlow.type == 1)
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
        return cashFlows.reduce((totalDebit, cashFlow) => {

            if(cashFlow.paymentType == 2)
            {
                return totalDebit + cashFlow.value;
            }
            else
            {
                return totalDebit + 0
            }         
            
          }, 0);
      }

      const calculateCredit = () => {
        return cashFlows.reduce((totalCredit, cashFlow) => {

            if(cashFlow.paymentType == 3)
            {
                return totalCredit + cashFlow.value;
            }
            else
            {
                return totalCredit + 0
            }         
            
          }, 0);
      }

      const calculatePix = () => {
        return cashFlows.reduce((totalPix, cashFlow) => {

            if(cashFlow.paymentType == 4)
            {
                return totalPix + cashFlow.value;
            }
            else
            {
                return totalPix + 0
            }         
            
          }, 0);
      }

      const calculateConsumption = () => {
        return cashFlows.reduce((totalConsumption, cashFlow) => {

            if(cashFlow.paymentType == 5)
            {
                return totalConsumption + cashFlow.value;
            }
            else
            {
                return totalConsumption + 0
            }         
            
          }, 0);
      }




    return(
        <>
        {loading && <Loading message={"Carregando..."}/>}

        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex flex-row w-full items-start justify-center">       
                <div className="w-8/12 p-2">
                    <div className="flex flex-row gap-2 mb-2">
                        <div className="flex flex-col">
                        <label>Tipo:</label>
                        <select className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" >
                            <option value="0">Suplemento</option>
                            <option value="1">Sangria</option>
                        </select>
                        </div>
                        <div className="flex flex-col">
                            <label>Valor:</label>
                            <CurrencyInput className="w-36 disabled:bg-zinc-300 disabled:text-zinc-400" name="openValue" />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <input className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" type="text" />
                        </div>
                        <div className="flex items-end">
                            <button type="button" className="text-white bg-green-600 border rounded border-green-400 p-2 flex items-center gap-1" ><FontAwesomeIcon icon={faPlus}/>Cadastrar movimento</button>
                        </div>
                    </div>
                    <div className="flex flex-col border rounded">
                        {/*Sumário */}
                        <div className="flex justify-between items-center p-2 border-b">                          
                            <h1><span className="font-bold">Dinheiro:</span> <CurrencyFormatter value={calculateCash()}/></h1>
                            <h1><span className="font-bold">Debito:</span> <CurrencyFormatter value={calculateDebit()}/></h1>
                            <h1><span className="font-bold">Crédito:</span> <CurrencyFormatter value={calculateCredit()}/></h1>
                            <h1><span className="font-bold">Pix:</span> <CurrencyFormatter value={calculatePix()}/></h1>
                            <h1><span className="font-bold">Fiado:</span> <CurrencyFormatter value={calculateConsumption()}/></h1>
                            <button type="button" className="text-white bg-blue-500 border rounded border-blue-400 p-2 flex items-center gap-1" ><FontAwesomeIcon icon={faLock}/>Fechar caixa</button>
                        </div>  
                        {/* Movimentos - cabeçalho */}
                        <div className="flex justify-center p-2 items-center border-b font-bold">
                            <p className="flex-1">Valor</p>
                            <p className="flex-1">Tipo</p>
                            <p className="flex-1">Tipo de pagamento</p>
                            <p className="flex-1">Descrição</p>
                        </div>
                        {cashFlows.map((cashFlow,index) => (
                            <CashFlowRow key={index}  value={cashFlow.value} type={cashFlow.type} paymentType={cashFlow.paymentType} description={cashFlow.description} />
                        ))}
                   
                    </div>
                </div>
            </div>
        </div> 
        </>
    
    


    )
}