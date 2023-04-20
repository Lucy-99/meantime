import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled.h2`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  font-family: 'Tilt Neon', cursive;
  font-weight: bolder;
`;

function Logo() {
  const navigate = useNavigate();
  return (
    <StyledLogo
      onClick={() => {
        navigate('/');
      }}
    >
      mintime
    </StyledLogo>
  );
}

export default Logo;
