import { Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import PlayList from './pages/PlayList';
import Register from './pages/Register';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Update from './pages/Update';
import AddPlaylist from './pages/AddPlaylist';


import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { AuthProvider } from './contexts/auth';

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <MainPage /> }
          />
          <Route
            exact
            path="/playlist/:id"
            render={(props) => (
              <PlayList id={parseInt(props.match.params.id) } />
            )}
          />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/profile/:nameURL" component={Profile}/>
          <Route path="/profile/playlist/add" component={AddPlaylist} />
          <Route path="/profile/update/:userURL" component={Update}/>
          <Route path="/faq" component={FAQ} />
        </Switch>

        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
