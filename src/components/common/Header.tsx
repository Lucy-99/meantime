import Logo from './Logo';
import { FaPlusSquare, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.main};
  position: relative;
  top: 0;
  z-index: 20;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div>
        <Logo />
      </div>
      <div className="flex justify-between items-center">
        <div className="mr-2 text-3xl cursor-pointer">
          <FaPlusSquare
            onClick={() => {
              navigate('/upload');
            }}
          />
        </div>
        <div>
          <FaUserCircle
            className=" text-3xl cursor-pointer"
            onClick={() => {
              navigate('/dashboard');
            }}
          />
        </div>
      </div>
    </StyledHeader>
  );
}

export default Header;
