import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActivateButtonsProps {
    active: boolean,
    onChangeActive: () => void
}

export default function ActivateButtons(props: ActivateButtonsProps) {

    const { active, onChangeActive } = props;

    return (
        <>
            {active &&
                <button type="button" className="text-red-600 hover:text-red-800" onClick={onChangeActive}>
                    <FontAwesomeIcon icon={faLock} />
                </button>
            }
            {!active &&
                <button type="button" className="text-green-600 hover:text-green-800" onClick={onChangeActive}>
                    <FontAwesomeIcon icon={faUnlock} />
                </button>
            }
        </>
    )





} 
