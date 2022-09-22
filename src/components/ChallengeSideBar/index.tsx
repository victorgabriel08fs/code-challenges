import { useState } from "react";
import { ChallengeSideBarContainer, Content, InstructionsContainer } from "./styles";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
import rehypeRaw from 'rehype-raw';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IChallenge } from "interfaces/Challenges.interface";


interface ChallengeSideBarProps {
    instructions: string,
    challengeTitle: string
}

export function ChallengeSideBar({ instructions, challengeTitle }: ChallengeSideBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    function goToHome() {
        router.push('/');
    }

    return (
        <ChallengeSideBarContainer isOpen={isOpen}>
            {!isOpen && (
                <button onClick={() => { setIsOpen(true) }}>
                    <BsFillArrowLeftSquareFill />
                </button>
            )}
            <Content>
                <header>
                    <div>
                        <button onClick={goToHome}>back to home</button>
                        <button onClick={() => { setIsOpen(false) }}>hide panel</button>
                    </div>
                    <h1>{challengeTitle}</h1>
                </header>
                <InstructionsContainer children={instructions} rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, "")}
                                    style={dracula as any}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                />
            </Content>
        </ChallengeSideBarContainer>
    );
}