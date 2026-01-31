
interface ActionButtonProps {
    className?: string,
    children: React.ReactNode,
    onAction: (id: number) => void,

}

export default function ActionButton(props: ActionButtonProps) {
    const { children, className, onAction } = props;
    return (
        <button type="button" className={className || "text-blue-600 hover:text-blue-800"} onClick={() => onAction(0)}>
            {children}
        </button>
    );
}