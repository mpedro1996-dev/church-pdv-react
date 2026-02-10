import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ValidatorMessage from "../validator-message";
import { useMemberStore } from "../../lib/zustand";

const memberSchema = z.object({
    name: z.string().min(3, "Informe o nome"),
    church: z.string().min(3, "Informe a igreja"),
    phoneNumber: z.string().min(4, "Informe o telefone")
});

type MemberFormData = z.infer<typeof memberSchema>

interface NewMemberProps {
    closeModal: (data: MemberFormData) => void;
}

export default function NewMember(props: NewMemberProps) {



    const { handleSubmit, register, formState: { errors } } = useForm<MemberFormData>({
        resolver: zodResolver(memberSchema)
    });

    function createMember(data: MemberFormData) {


        props.closeModal(data);


    }

    return (
        <>


            <div className="transition-all fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div className="bg-white w-72 p-4 rounded shadow-lg relative z-0 text-black flex flex-col">
                    <div className="border-b rounded p-2 flex justify-between">
                        <h1 className="font-semibold">Dados do pagador</h1>
                    </div>
                    <div>
                        <form className="flex flex-col gap-2 mt-1" onSubmit={handleSubmit(createMember)}>
                            <div className="flex flex-col gap-1">
                                <label>Nome:</label>
                                <Input register={register("name")} name="name" type="text" />
                                {errors.name && <ValidatorMessage>{errors.name.message}</ValidatorMessage>}

                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Igreja:</label>
                                <Input register={register("church")} name="church" type="text" />
                                {errors.church && <ValidatorMessage>{errors.church.message}</ValidatorMessage>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Telefone:</label>
                                <Input register={register("phoneNumber")} name="phoneNumber" type="text" />
                                {errors.phoneNumber && <ValidatorMessage>{errors.phoneNumber.message}</ValidatorMessage>}
                            </div>
                            <div className="flex flex-row-reverse py-2 px-1 border-t">
                                <button className="bg-blue-700 border rounded border-blue-300 text-white px-2 py-1 flex gap-1 items-center" type="submit"><FontAwesomeIcon icon={faPlus} />Adicionar</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );

}