import { User } from "@/app/lib/model";
import Form from "../../forms/form";
import FormField from "../../forms/form-field";
import ModalEdit from "../../forms/modal-edit"
import Input from "../../input";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatorMessage from "../../validator-message";
import FormFooter from "../../forms/form-footer";
import ConfirmButton from "../../forms/confirm-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { api } from "@/app/lib/axios";
import { useSessionStore, useUserStore } from "@/app/lib/zustand";
import { useEffect, useState } from "react";


interface ResetPasswordProps {

    userId: number | null;
    onClose: () => void;
};

const resetPasswordSchema = z.object({
    password: z.string().min(3, "Informe a senha"),
    confirmPassword: z.string().min(3, "Confirme a senha")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>


export default function ResetPassword(props: ResetPasswordProps) {

    const { session } = useSessionStore();
    const { users, setUsers } = useUserStore();
    const { userId } = props;

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {

        const user = users.find(u => u.id === userId);

        if (!user) return;

        setName(user.name);
        setUsername(user.userName);
        setPassword('');
        setConfirmPassword('');

    }, [userId, users]);


    const closeModal = () => {
        props.onClose();

    }

    const { handleSubmit, register, formState: { errors } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema), defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    async function save(data: ResetPasswordFormData) {


        const update = () => {
            const response = api.put(`/api/users/${props.userId}/reset-password`, data,
                {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                }
            );

            return response;
        }

        try {
            const response = await update();
            const result = response.data;

            if (result.isSuccess) {
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

        catch (error) {
            console.error('Save User error', error);
        }

    }




    return (
        <ModalEdit onClose={closeModal} title={`Redefinir Senha: ${username}`}>
            <Form onSubmit={handleSubmit(save)}>
                <FormField>
                    <label>Senha:</label>
                    <Input register={register("password")} name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {errors.password && <ValidatorMessage>{errors.password.message}</ValidatorMessage>}
                </FormField>
                <FormField>
                    <label>Confirme a Senha:</label>
                    <Input register={register("confirmPassword")} name="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <ValidatorMessage>{errors.confirmPassword.message}</ValidatorMessage>}
                </FormField>
                <FormFooter>
                    <ConfirmButton><FontAwesomeIcon icon={faSave} />Redefinir senha</ConfirmButton>
                </FormFooter>
            </Form>

        </ModalEdit>
    );


}