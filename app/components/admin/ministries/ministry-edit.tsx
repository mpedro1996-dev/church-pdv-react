import User, { Ministry } from "@/app/lib/model";
import Form from "../../forms/form";
import FormField from "../../forms/form-field";
import ModalEdit from "../../forms/modal-edit"
import Input from "../../input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatorMessage from "../../validator-message";
import FormFooter from "../../forms/form-footer";
import ConfirmButton from "../../forms/confirm-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/app/lib/axios";
import { useMinistryStore, useTokenStore } from "@/app/lib/zustand";
import { useEffect, useState } from "react";


interface MinistryEditProps {

    isEditing: boolean;
    id: number | null;
    onClose: () => void;
};

const ministrySchema = z.object({
    name: z.string().min(3, "Informe o nome"),
    acronym: z.string().min(3, "Informe acrônimo"),
});

type MinistryFormData = z.infer<typeof ministrySchema>


export default function UserEdit(props: MinistryEditProps) {

    const { token } = useTokenStore();
    const { ministries, setMinistries } = useMinistryStore();
    const { isEditing, id } = props;

    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');

    useEffect(() => {

        if (!isEditing || !id) {
            reset({ name: '', acronym: '' });

            setName('');
            setAcronym('');
            return;
        }


        const ministry = ministries.find(m => m.id === id);

        if (!ministry) return;

        setName(ministry.name);
        setAcronym(ministry.acronym);

        reset(
            { name: ministry.name ?? '', acronym: ministry.acronym ?? '' }
        );
    }, [isEditing, id, ministries]);


    const closeModal = () => {
        props.onClose();

    }

    const { handleSubmit, register, reset, formState: { errors } } = useForm<MinistryFormData>({
        resolver: zodResolver(ministrySchema), defaultValues: {
            name: '',
            acronym: ''
        }
    });

    async function save(data: MinistryFormData) {
        const create = () => {
            const response = api.post('/api/ministries', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }

        const update = () => {
            const response = api.put(`/api/ministries/${props.id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response;
        }

        try {
            const response = props.isEditing ? await update() : await create();
            const result = response.data;

            if (result.isSuccess) {
                if (props.isEditing) {
                    const updatedMinistry: Ministry = result.value;
                    const updatedMinistries = ministries.map(ministry =>
                        ministry.id === updatedMinistry.id ? updatedMinistry : ministry
                    );
                    setMinistries(updatedMinistries);
                } else {
                    const newMinistry: Ministry = result.value;
                    setMinistries([...ministries, newMinistry]);
                }

                closeModal();
            }
        }
        catch (error) {
            console.error('Save User error', error);
        }

    }




    return (
        <ModalEdit onClose={closeModal} title={props.isEditing ? "Editar Ministério" : "Novo Ministério"}>
            <Form onSubmit={handleSubmit(save)}>
                <FormField>
                    <label>Nome:</label>
                    <Input register={register("name")} name="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <ValidatorMessage>{errors.name.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Acrônimo:</label>
                    <Input register={register("acronym")} name="acronym" type="text" value={acronym} onChange={e => setAcronym(e.target.value)} />
                    {errors.acronym && <ValidatorMessage>{errors.acronym.message}</ValidatorMessage>}
                </FormField>
                <FormFooter>
                    <ConfirmButton><FontAwesomeIcon icon={faSave} />Salvar</ConfirmButton>
                </FormFooter>
            </Form>

        </ModalEdit>
    );


}