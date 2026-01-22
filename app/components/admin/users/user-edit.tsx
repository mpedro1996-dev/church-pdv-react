import Form from "../../forms/form";
import FormField from "../../forms/form-field";
import ModalEdit from "../../forms/modal-edit"



export default function UserEdit() {

    const closeModal = () => {

    }

    return (
        <ModalEdit onClose={closeModal} title="Editar Usuário">
            <Form onSubmit={() => { }}>
                <FormField>
                    <label>Nome:</label>

                </FormField>
            </Form>

        </ModalEdit>
    );


}