import ModalEdit from "../../modal-edit"



export default function UserEdit() {

    const closeModal = () => {

    }

    return (
        <ModalEdit onClose={closeModal} title="Editar Usuário">
            <p>Conteúdo do modal de edição de usuário</p>

        </ModalEdit>
    );


}