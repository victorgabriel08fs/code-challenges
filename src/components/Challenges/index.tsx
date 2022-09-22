import { Challenge } from "components/Challenge";
import { ChallengesContainer } from "./styles";
import { useState, useEffect } from 'react';
import { IChallenge } from "interfaces/Challenges.interface";

export interface ChallengesProps {
    challenges: IChallenge[]
  }

export function Challenges({ challenges }: ChallengesProps) {

    return (
        <ChallengesContainer>
            <h2>All Challenges</h2>
            <div>
                {challenges.map((challenge) => (
                    <Challenge key={challenge.id} challenge={challenge} />
                ))}
            </div>
        </ChallengesContainer>
    );
}