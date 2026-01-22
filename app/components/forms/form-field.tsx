interface FormFieldProps {
    children: React.ReactNode;
}


export default function FormField(props: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            {props.children}
        </div>
    );
}