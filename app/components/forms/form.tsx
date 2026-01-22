
interface FormProps {
    children: React.ReactNode;
    onSubmit: () => void;
}

export default function Form(props: FormProps) {
    return (
        <form className="flex flex-col gap-2 mt-1" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}