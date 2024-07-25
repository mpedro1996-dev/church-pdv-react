import { faLock, faXmark } from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultErrorMap } from "zod";
import { api, registerLoadingIndicator } from "../lib/axios";
import { useTokenStore } from "../lib/zustand";
import { useRouter } from 'next/navigation';

interface CloseCashProps{
    closeModal:() => void;
}

export default function CloseCash(props: CloseCashProps){

    const [loading, setLoading] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    const [cashValue, setCashValue] = useState(0);
    const [debitValue, setDebitValue] = useState(0);
    const [creditValue, setCreditValue] = useState(0);
    const [pixValue, setPixValue] = useState(0);
    const [consumptionValue, setConsumptionValue] = useState(0);
    const {token} = useTokenStore();
    const router = useRouter();

    useEffect(() => {
        // Registrar a função setLoading no interceptor
        registerLoadingIndicator(setLoading);
    }, []);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/[^0-9]/g, '');
        let inputName = e.target.name;
        let value = parseInt(inputValue) / 100
        let formattedValue = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);      
        e.target.value = formattedValue; 
        
        setValue(value, inputName);
    
    };
  
    const formatValue = (value:number) => {      
    let formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);

    
    return formattedValue  
    }

    const setValue = (value : number, name:string) => {
        switch(name){
            case "cashValue": setCashValue(value); break;
            case "debitValue": setDebitValue(value); break;
            case "creditValue": setCreditValue(value); break;
            case "pixValue": setPixValue(value); break;
            case "consumptionValue": setConsumptionValue(value); break;
        }
    }

    const getValue = (name:string): number => {
        switch(name){
            case "cashValue": return cashValue; 
            case "debitValue": return debitValue;
            case "creditValue": return creditValue;
            case "pixValue": return pixValue;
            case "consumptionValue": return consumptionValue;
            default: return 0
        }
    }

    async function handleSubmit(e: React.FormEvent){

        e.preventDefault();
        
        const data = {
            cashValue: cashValue,
            debitValue: debitValue,
            creditValue: creditValue,
            pixValue: pixValue,
            consumptionValue: consumptionValue,
        }

        try
        {            
            const response = await api.post('/api/cashes', data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );            
            const result = response.data;

            if(result.isSuccess)
            {                
                setIsLogout(true);
                router.push('/');
            }        
        }
        catch(error)
        {
            console.error('Login failed', error);
        }


        console.log(data);
    }
    

    return(


        <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        {loading && <Loading message="Aguarde..."/>} 
        {isLogout && <Loading message="Fazendo logout..."/>} 
          <div className="bg-white w-72 p-4 rounded shadow-lg relative z-0 text-black flex flex-col">
            <div className="border-b rounded p-2 flex justify-between">
                <h1 className="font-semibold">Fechamento de caixa</h1>
                <button onClick={props.closeModal}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div>
                <form className="flex flex-col gap-2 mt-1" onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col">
                        <label>Dinheiro:</label>
                        <input onChange={(e) => {handleChange(e)}} name="cashValue" value={formatValue(getValue("cashValue"))} className={`rounded border border-zinc-400 shadow-sm h-10 px-2`}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Debito:</label>
                        <input onChange={(e) => {handleChange(e)}} name="debitValue" value={formatValue(getValue("debitValue"))} className={`rounded border border-zinc-400 shadow-sm h-10 px-2`}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Crédito:</label>
                        <input onChange={(e) => {handleChange(e)}} name="creditValue" value={formatValue(getValue("creditValue"))} className={`rounded border border-zinc-400 shadow-sm h-10 px-2`}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Pix:</label>
                        <input onChange={(e) => {handleChange(e)}} name="pixValue" value={formatValue(getValue("pixValue"))} className={`rounded border border-zinc-400 shadow-sm h-10 px-2`}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Fiado:</label>
                        <input onChange={(e) => {handleChange(e)}} name="consumptionValue" value={formatValue(getValue("consumptionValue"))} className={`rounded border border-zinc-400 shadow-sm h-10 px-2`}/>
                    </div>
                    <div className="flex flex-row-reverse py-2 px-1 border-t">
                        <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="submit"><FontAwesomeIcon icon={faLock}/>Fechar caixa</button>
                    </div>
                </form>
            </div>

          </div>
        </div>
    )

}