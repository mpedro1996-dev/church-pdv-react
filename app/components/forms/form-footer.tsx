interface FormFooterProps {
    children: React.ReactNode;
}
export default function FormFooter({ children }: FormFooterProps) {

    return (
        <div className="flex flex-row-reverse py-2 px-1 border-t">
            {children}
        </div>
    )

}