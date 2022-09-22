import { Challenges, ChallengesProps } from "components/Challenges";
import { Header } from "components/Header";
import type { GetStaticProps, NextPage } from "next";
import { HomePageContainer } from "../styles/pages/homePage";
import { prisma } from 'lib/prisma';
import { IChallenge, ITag } from "interfaces/Challenges.interface";
import Head from "next/head";

interface HomeProps extends ChallengesProps {
}

const Home: NextPage<HomeProps> = ({ challenges }) => {
  return (
    <HomePageContainer>
      <Head>
        <title>Challenges | upskill.code</title>

        <meta
          name="description"
          content="Simple Code Challenge Platform with integrated code editor. Train for your job interviews for free!"
        />
        <meta
          property="og:description"
          content="Simple Code Challenge Platform with integrated code editor. Train for your job interviews for free!"
        />
      </Head>
      <Header />
      <Challenges challenges={challenges} />
    </HomePageContainer>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const challenges = await prisma.challenge.findMany({
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
  const parsedChallenges = challenges.map((challenge: IChallenge) => ({
    ...challenge,
    tags: [...challenge.tags.map((tag:ITag) => tag.tag)],
  }));

  return {
    props: {
      challenges: parsedChallenges
    },
    revalidate: 86400
  }
}