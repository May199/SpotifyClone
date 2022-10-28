import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import Button from '../Button';
import Logo from '../Logo';

import './index.css';

const Navbar: FC = () => {
  const { signOut, session } = useContext(AuthContext);

  const history = useHistory();

  const [navControls, setNavControls] = useState(<></>);

  useEffect(() => {
    setNavControls(
      session.authenticated ? (
        <>
          <Button
            noBg
            noBorder
            to={`/profile/${session.userURL}`}
            style={{ fontSize: '0.9rem' }}>
            {session.user.name}
          </Button>
          <Button
            tag="a"
            onClick={handleLogout}
            noBg
            noBorder
            style={{ fontSize: '0.9rem' }}>
            Logoff
          </Button>
        </>
      ) : (
        <>
          <Button noBg noBorder to="/register" style={{ fontSize: '0.9rem' }}>
            Registre-se
          </Button>
          <Button noBg noBorder to="/login" style={{ fontSize: '0.9rem' }}>
            Login
          </Button>
        </>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function handleLogout() {
    signOut();

    history.push({
      pathname: '/',
      state: {
        success: true,
        message: 'User Logged out!',
      },
    });
  }

  return (
    <header className="Navbar">
      <Logo />
      <nav>
        <Button noBg noBorder to="/faq" style={{ fontSize: '0.9rem' }}>
          FAQ
        </Button>
        <span>|</span>
        {navControls}
      </nav>
    </header>
  );
};

export default Navbar;
