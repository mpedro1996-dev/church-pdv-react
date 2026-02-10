import { useSessionStore } from "../lib/zustand";

export default function PrintableLogo() {

    var { session } = useSessionStore();

    return (
        <div className="flex justify-center items-center flex-col mb-2">
            <img src={`/${session?.logo}`} alt="Imagem Fixa" width={200} height={100} className="max-w-full h-auto" />
        </div>
    )
}