'use client'

type DecisionButtonProps = {
    children?: React.ReactNode;
    className?: string;
    bgColor?: string;
    text: string;
    hoverDescription?: string;
    onClick?: ()=>void;
}
export default function DecisionButton({text, className, hoverDescription, children, onClick, bgColor="gray-600" }:DecisionButtonProps){
    return (
        <div className={`${className} max-w-30 bg-${bgColor}`}>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    );
}