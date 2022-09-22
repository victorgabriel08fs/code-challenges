import sdk, { VM } from "@stackblitz/sdk";
import { IChallenge } from "interfaces/Challenges.interface";
import { useCallback, useEffect, useRef } from "react";
import { CodeEditorContainer } from "./styles";

const AUTOSAVE_IN_MS = 10000;

interface CodeEditorProps {
    setInstructions: (instructions: string) => void,
    embedId: string
}

export function CodeEditor({ setInstructions, embedId }: CodeEditorProps) {
    const vm = useRef<VM | null>(null);

    const loadVM = useCallback(async () => {
        vm.current = await sdk.embedProjectId("embed", embedId, {
            openFile: "src/App.tsx",
        });

        const snapshot = await vm.current.getFsSnapshot();

        if (snapshot) {
            const instructions = snapshot["README.md"];
            setInstructions(instructions);
        }

        const storageData = localStorage.getItem(`savedData:${embedId}`);

        if (storageData) {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            const parsed = JSON.parse(storageData);
            await vm.current.applyFsDiff({
                create: {
                    ...parsed
                },
                destroy: []
            });
        }
    }, []);

    useEffect(() => {
        loadVM();
    }, [loadVM]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (!vm?.current) return;
            const snapshot = await vm.current.getFsSnapshot();
            if (snapshot) {
                localStorage.setItem(`savedData:${embedId}`, JSON.stringify(snapshot));
            }
        }, AUTOSAVE_IN_MS);

        return () => {
            clearInterval(interval);
        }
    }, [embedId]);

    return (
        <CodeEditorContainer id="embed" />
    );
}