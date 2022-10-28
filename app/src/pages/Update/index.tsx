import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import ErrorBox from '../../components/ErrorBox';

import api from '../../connections/api';

import AuthContext from '../../contexts/auth';

import './index.css';

const Update: FC = () => {
  const { session, updateSession } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  const [errors, setErrors] = useState<JSX.Element[]>([]);

  useEffect(() => {
    api.get(`profile/${session.user.id}`).then(({ data }) => {
      setEmail(data.email);
      setName(data.name);
      setBirth(data.birth);
      setGender(data.gender);
    });
  }, [session]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setErrors([]);
    window.scrollTo(0, 0);

    const user = {
      email,
      confirmEmail,
      password,
      name,
      birth,
      gender,
    };

    try {
      const response = await api.put(`profile/update/${session.user.id}`, user);
      updateSession();

      history.push({
        pathname: '/',
        state: {
          success: response.status === 200,
          message: response.data.message,
        },
      });
    } catch (error: any) {
      const { validation, message } = error.response.data;
      if (validation) {
        // eslint-disable-next-line array-callback-return
        validation.body.keys.map((el: string, i: number) => {
          setErrors((prev) => [
            ...prev,
            <ErrorBox key={el}>
              {validation.body.message[i].replace(/\[.*\]/, 'equal to email!')}
            </ErrorBox>,
          ]);
        });
      }

      if (message) {
        setErrors((prev) => [
          ...prev,
          <ErrorBox key={prev.length}>{message}</ErrorBox>,
        ]);
      }
    }
  }

  return (
    <div className="Update">
      {errors.map((err) => err)}
      <form action="#" onSubmit={handleSubmit}>
        <input
          autoFocus
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          name="confirm-email"
          type="email"
          placeholder="Confirmar e-mail"
          onChange={(e) => setConfirmEmail(e.target.value)}
          value={confirmEmail}
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <input
          name="name"
          type="text"
          placeholder="Como devemos lhe chamar"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor="birth">Data de Nascimento</label>
        <input
          name="birth"
          type="date"
          onChange={(e) => setBirth(e.target.value)}
          value={birth}
        />

        <div className="radio-group">
          <input
            id="M"
            name="gender"
            type="radio"
            value="M"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="M">Masculino</label>
          <input
            id="F"
            name="gender"
            type="radio"
            value="F"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="F">Feminino</label>
          <input
            id="X"
            name="gender"
            type="radio"
            value="X"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="X">Não binário</label>
        </div>

        <Button tag="button" green md circle>
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default Update;
