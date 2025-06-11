import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface SubmitButtonProps {
    text: string;
    isLoading?: boolean; 
}

export function SubmitButton({ text, isLoading } : SubmitButtonProps) {
    return (
        <>
            <Button className="w-full font-bold text-md bg-gradient-to-r from-blue-500 to-teal-500" size="lg" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                    </>
                ) : (
                    text
                )}
            </Button>
        </>
    );
}