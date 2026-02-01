interface FormFieldProps {
    children: React.ReactNode;
    className?: string;
}


export default function FormField(props: FormFieldProps) {
    return (
        <div className={`${props.className ?? ''} flex flex-col gap-1`}>
            {props.children}
        </div>
    );
}