import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '../../components/Button';
import ErrorBox from '../../components/ErrorBox';

import AuthContext from '../../contexts/auth';

import './index.css';

const Login: FC = () => {
  const { signIn, session } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (session.authenticated) {
      history.push(`/profile/${session.userURL}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function handleLogin(e: SyntheticEvent) {
    e.preventDefault();

    setErrors([]);

    const user = {
      email,
      password,
    };

    signIn(user, (err) => {
      if (axios.isAxiosError(err) && err) {
        if (err.response) {
          setErrors((prev) => [
            ...prev,
            <ErrorBox key={prev.length}>{err.response!.data.message}</ErrorBox>,
          ]);
        }
      }
    });
  }

  return (
    <div className="Login">
      <h1>Faça login</h1>
      {errors.map((err) => err)}
      <form action="#" onSubmit={handleLogin}>
        <input
          autoFocus
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button tag="button" green md circle>
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
