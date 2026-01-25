interface ConfirmButtonProps {

    children: React.ReactNode;


}

export default function ConfirmButton({ children }: ConfirmButtonProps) {

    return (

        <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="submit">{children}</button>
    )
}