import { ChangeEvent, ComponentProps, useState } from "react";

interface CurrencyInputProps extends ComponentProps<'input'>{

} 

export default function CurrencyInput(props:CurrencyInputProps){
 

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value.replace(/[^0-9]/g, '');
      let formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(parseInt(inputValue) / 100);
      e.target.value = formattedValue;
  
    };
    return(
        <input {...props} onChange={handleChange} className={`${props.className} rounded border border-zinc-400 shadow-sm h-10 px-2`}/>

    )
}