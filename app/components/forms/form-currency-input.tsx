import React from "react";

type FormCurrencyInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
> & {
    valueCents: number;
    onValueCentsChange: (cents: number) => void;
};

export function FormCurrencyInput({
    valueCents,
    onValueCentsChange,
    ...props
}: FormCurrencyInputProps) {
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format((valueCents ?? 0) / 100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/[^\d]/g, "");
        const cents = digits ? Number(digits) : 0;
        onValueCentsChange(cents);
    };

    return <input {...props} value={formatted} onChange={handleChange} className={`${props.className} rounded border border-zinc-400 shadow-sm h-10 px-2`} />;
}