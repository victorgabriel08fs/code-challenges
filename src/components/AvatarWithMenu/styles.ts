import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const AvatarTrigger = styled(DropdownMenu.Trigger)`
width:3.5rem;
height:3.5rem;
border-radius:50%;
border:2px solid ${({ theme }) => theme.text};
transition: .4s;
position: relative;
overflow: hidden;

&:hover{
    border-color: ${({ theme }) => theme.primary};
}
`;

export const DropdownContent = styled(DropdownMenu.Content)`
background: ${({ theme }) => theme.shape};
box-shadow: 0 10px 30px -10px ${({ theme }) => theme.shadow};
display: flex;
flex-direction: column;
gap:1rem;
padding: 1rem 0;
border-radius: 0.3rem;
`;

export const DropdownItem = styled(DropdownMenu.Item)`
padding: 0 1rem;
cursor: pointer;
`;
export const DropdownText = styled(DropdownMenu.Item)`
padding: 0 1rem;
cursor: default;
`;

export const DropdownArrow = styled(DropdownMenu.Arrow)`
fill: ${({ theme }) => theme.shape};
`;
