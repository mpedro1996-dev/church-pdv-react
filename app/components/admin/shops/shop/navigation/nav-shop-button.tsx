interface NavShopButtonProps {
    children: React.ReactNode;
    selected: boolean;
    label: string;
    onClick: (key: string) => void;
}

export default function NavShopButton({ children, selected, label, onClick }: NavShopButtonProps) {
    return (
        <button className={`flex-1 text-sm font-medium border-r p-2 text-center ${selected ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`} onClick={() => onClick(label)}>{children}</button>
    )
}