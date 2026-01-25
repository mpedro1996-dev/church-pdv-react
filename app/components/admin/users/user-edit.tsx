import User from "@/app/lib/model";
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
import { useTokenStore, useUserStore } from "@/app/lib/zustand";
import { useEffect, useState } from "react";


interface UserEditProps {

    isEditing: boolean;
    userId: number | null;
    onClose: () => void;
};

const userSchema = z.object({
    name: z.string().min(3, "Informe o nome"),
    username: z.string().min(3, "Informe nome de usuário"),
});

type UserFormData = z.infer<typeof userSchema>


export default function UserEdit(props: UserEditProps) {

    const { token } = useTokenStore();
    const { users, setUsers } = useUserStore();
    const { isEditing, userId } = props;

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {

        if (!isEditing || !userId) {
            reset({ name: '', username: '' });

            setName('');
            setUsername('');
            return;
        }


        const user = users.find(u => u.id === userId);

        if (!user) return;

        setName(user.name);
        setUsername(user.userName);

        reset(
            { name: user.name ?? '', username: user.userName ?? '' }
        );
    }, [isEditing, userId, users]);


    const closeModal = () => {
        props.onClose();

    }

    const { handleSubmit, register, reset, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userSchema), defaultValues: {
            name: '',
            username: ''
        }
    });

    async function save(data: UserFormData) {

        const create = () => {
            const response = api.post('/api/users', data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response;
        }

        const update = () => {
            const response = api.put(`/api/users/${props.userId}`, data,
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
                    const updatedUser: User = result.value;
                    const updatedUsers = users.map(user =>
                        user.id === updatedUser.id ? updatedUser : user
                    );
                    setUsers(updatedUsers);
                } else {
                    const newUser: User = result.value;
                    setUsers([...users, newUser]);
                }

                closeModal();
            }
        }
        catch (error) {
            console.error('Save User error', error);
        }

    }




    return (
        <ModalEdit onClose={closeModal} title={props.isEditing ? "Editar Usuário" : "Novo Usuário"}>
            <Form onSubmit={handleSubmit(save)}>
                <FormField>
                    <label>Nome:</label>
                    <Input register={register("name")} name="name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <ValidatorMessage>{errors.name.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Nome de usuário:</label>
                    <Input register={register("username")} name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    {errors.username && <ValidatorMessage>{errors.username.message}</ValidatorMessage>}
                </FormField>
                <FormFooter>
                    <ConfirmButton><FontAwesomeIcon icon={faSave} />Salvar</ConfirmButton>
                </FormFooter>
            </Form>

        </ModalEdit>
    );


}