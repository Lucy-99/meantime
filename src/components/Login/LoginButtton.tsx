import { lighten } from 'polished';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => lighten(0.3, props.theme.colors.main)};
  font-size: 1.25rem;
  color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  width: 17.5rem;

  img {
    width: 1.25rem;
    margin-right: 0.75rem;
    opacity: 0.8;
  }

  &:hover {
    background-color: ${(props) => lighten(0.1, props.theme.colors.main)};
    img {
      opacity: 1;
    }
  }
`;

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function LoginButton({ onClick }: Props) {
  return (
    <StyledButton onClick={onClick}>
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
        alt=""
      />
      <span>Login with Metamask</span>
    </StyledButton>
  );
}

export default LoginButton;
