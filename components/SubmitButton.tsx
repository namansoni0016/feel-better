import { Button } from "./ui/button";

interface SubmitButtonProps {
    text: string;
}

export function SubmitButton({ text } : SubmitButtonProps) {
    return (
        <>
            <Button className="w-full font-bold text-md bg-blue-600" size="lg">
                {text}
            </Button>
        </>
    );
}