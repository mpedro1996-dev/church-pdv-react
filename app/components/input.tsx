import React, { ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends ComponentProps<'input'> {
    register: UseFormRegisterReturn;

}


export default function Input({ register, ...props }: InputProps) {
    return (

        <input {...register} {...props} className={`${props.className ?? ''} rounded border border-zinc-400 shadow-sm w-full h-10 px-2`} />
    );

}