import { faFloppyDisk, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api, registerLoadingIndicator } from "../lib/axios";
import { useTokenStore } from "../lib/zustand";
import Loading from "./loading";
import { useEffect, useState } from "react";


interface UpdatePaymentProps{
  closeModal:() => void;
  id:number,
  paymentType: number,
}

export default function UpdatePayment(props:UpdatePaymentProps){

    const {token} = useTokenStore();
    const [loading, setLoading] = useState(false);   
    const [paymentType, setPaymentType] = useState(props.paymentType);
    
    useEffect(()=>{
        registerLoadingIndicator(setLoading)
    },[]);

  


    async function updatePayment(){

      const data =
      {
        "value":0,
        "member": null,
        "paymentType":paymentType

      }

        try
        {            
            const response = await api.put(`/api/payments/${props.id}`, data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );            
            const result = response.data;

            if(result.isSuccess)
            {                
                props.closeModal();
            }        
        }
        catch(error)
        {
            console.error('Login failed', error);
        }

    }

    const handlePaymentTypeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
      setPaymentType(Number(event.target.value));
  };

    return (
        <>        

        <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        {loading && <Loading message="Aguarde..."/>} 
          <div className="bg-white w-72 p-4 rounded shadow-lg relative z-0 text-black flex flex-col">
            <div className="border-b rounded p-2 flex justify-between">
                <h1 className="font-semibold">Mudar forma de pagamento</h1>
                <button onClick={props.closeModal}><FontAwesomeIcon icon={faXmark}/></button>
            </div>
            <div>
                <div className="flex flex-col gap-2 mt-1">
                    <div className="flex flex-col gap-1">
                        <label>Ministério:</label>
                        <select className="rounded border border-zinc-400 shadow-sm w-full h-10 px-2" onChange={handlePaymentTypeChange} defaultValue={ paymentType == 1 || paymentType == 5 ? 1 : paymentType} >
                            <option value={1}>Dinheiro</option>
                            <option value={2}>Débito</option>
                            <option value={3}>Credito</option>
                            <option value={4}>Pix</option>
                        </select>
                    </div>
                    <div className="flex flex-row-reverse py-2 px-1 border-t">
                        <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="button" onClick={() => updatePayment()}><FontAwesomeIcon icon={faFloppyDisk}/>Salvar</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </>
      );
    
}