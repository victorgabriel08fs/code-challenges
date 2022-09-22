import { ChallengeSideBar } from 'components/ChallengeSideBar';
import { CodeEditor } from 'components/CodeEditor';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { ChallengePageContainer } from 'styles/pages/challengePage';
import { prisma } from 'lib/prisma';
import { ChallengeProps } from 'components/Challenge';
import Head from 'next/head';

const Challenge: NextPage<ChallengeProps> = ({ challenge }) => {
    const [instructions, setInstructions] = useState("");

    return (
        <ChallengePageContainer>
            <Head>
                <title>{`${challenge.title} | upskill.code`}</title>
            </Head>
            <CodeEditor embedId={challenge.embedId} setInstructions={setInstructions} />
            <ChallengeSideBar challengeTitle={challenge.title} instructions={instructions} />
        </ChallengePageContainer>
    );
}

export default Challenge;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { slug } = context.params as { slug: string };

    const challenge = await prisma.challenge.findUnique({
        where: {
            slug
        }
    })

    if (!challenge) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            challenge
        }
    }
}