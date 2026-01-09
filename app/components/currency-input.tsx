import { ChangeEvent, ComponentProps, useState } from "react";
import { usePayValueStore } from "../lib/zustand";

interface CurrencyInputProps extends ComponentProps<'input'>{

} 

export default function CurrencyInput(props:CurrencyInputProps){
 
    const {payValue, setPayValue} = usePayValueStore()

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/[^0-9]/g, '');
      let value = parseInt(inputValue) / 100
      let formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);      
      e.target.value = formattedValue;
      setPayValue(value);
  
    };

    const formatValue = () => {      
      let formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(payValue);
      
      return formattedValue


    }
    return(
        <input {...props} onChange={(e) => {handleChange(e)}} value={formatValue()} className={`${props.className} rounded border border-zinc-400 shadow-sm h-10 px-2`}/>

    )
}