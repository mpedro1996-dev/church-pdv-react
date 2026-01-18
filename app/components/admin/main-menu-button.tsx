import { ComponentProps } from "react";

interface MainMenuButtonProps extends ComponentProps<'a'> {
    children: React.ReactNode;
}

export default function MainMenuButton(props: MainMenuButtonProps) {
    return (

        <a {...props} className="bg-white text-black hover:bg-gray-100 hover:text-gray-800 font-bold  py-2 px-4 w-full h-32 rounded border-2 border-gray-200 mb-2 text-2xl flex flex-auto items-center justify-items-center">
            <div className="w-full flex justify-center gap-1">
                {props.children}
            </div>
        </a>
    );

}