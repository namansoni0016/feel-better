import { Button } from "./ui/button";

interface SubmitButtonProps {
    text: string;
}

export function SubmitButton({ text } : SubmitButtonProps) {
    return (
        <>
            <Button className="w-full font-bold text-md bg-gradient-to-r from-blue-500 to-teal-500" size="lg">
                {text}
            </Button>
        </>
    );
}