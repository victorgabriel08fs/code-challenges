import Link from 'next/link';
import { HeaderContainer } from "components/Header/styles";
import { AvatarWithMenu } from 'components/AvatarWithMenu';

export function Header() {
    return (
        <HeaderContainer>
            <Link href="/">upskill.code</Link>
            <AvatarWithMenu />
        </HeaderContainer>
    );
}