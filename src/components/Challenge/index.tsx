import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { ChallengeContainer, DifficultyTag, TagItem, TagsContainer } from "./styles";
import { IChallenge, ITag } from 'interfaces/Challenges.interface';

export interface ChallengeProps {
    challenge: IChallenge;
}

export function Challenge({ challenge }: ChallengeProps) {
    return (
        <Link href={`/challenges/${challenge.slug}`} passHref>
            <ChallengeContainer>
                <header>
                    <DifficultyTag difficulty={challenge.difficulty}>{challenge.difficulty}</DifficultyTag>
                    <BiLinkExternal />
                </header>

                <h3>{challenge.title}</h3>

                <p>{challenge.description}</p>
                <TagsContainer>
                    {challenge.tags.map((tag: ITag) => (<TagItem key={tag.slug}>{tag.name}</TagItem>))}
                </TagsContainer>
            </ChallengeContainer>
        </Link>
    );
}