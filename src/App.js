
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header/Header';
import Dashboard from './container/Home/Dashboard';
import Home from './container/Home/Home';
import Auth from './container/Login/Auth';
import Page404 from './container/Other/Page404';
import Account from './container/Profile/Account';
import SolutionDetail from './container/SolutionDetail/SolutionDetail';
import Solutions from './container/Solutions/Solutions';
import { supabase } from './supabaseClient';
import { ProtectedRoute } from './util/ProtectedRoute';

import './App.css';

async function fetchSolution(id) {
  const { data, error, status } = await supabase.from('solution').select('*').eq('id', id);
  const solution = data[0];

  return solution;
}

async function fetchSolutionServices(id) {
  const query = `id, name, config, solution(*), service(*)`;
  const { data, error, status } = await supabase.from('solution_services').select(query).eq('solutionId', id);

  return data;
}


export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const [primaryColor, setPrimaryColor] = useState('#000');
  const [secondaryColor, setSecondaryColor] = useState('#fff');
  const [logo, setLogo] = useState('https://i.imgur.com/6Q9ZQ9u.png');
  const [title, setTitle] = useState('Solutions');
  const [services, setServices] = useState([]);

  let innerTheme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });

  useEffect(async () => {
    setSession(supabase.auth.session());

    const solutionId = 84;
    const solution = await fetchSolution(solutionId);
    setServices(await fetchSolutionServices(solutionId));

    setPrimaryColor(solution.primaryColor);
    setSecondaryColor(solution.secondaryColor);
    setLogo(solution.logo);
    setTitle(solution.name);
    document.title = solution.name;
    document.getElementById("favicon").href = solution.logo;

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

    });
  }, []);


  return (
    <div className="App">
      <ThemeProvider theme={innerTheme}>
        {session === null && <Auth setSession={setSession} setLoading={setLoading} />}
        {session !== null &&
          <BrowserRouter>

            {!loading && <Header session={session} logo={logo} title={title} services={services} />}

            <CssBaseline />
            <Container fixed style={{ paddingTop: 30 }}>

              <main>
                <Switch>
                  <ProtectedRoute as={SolutionDetail} role={1} path={`/solution-detail/:id`} />
                  <ProtectedRoute as={Solutions} role={1} path="/solutions" />

                  <ProtectedRoute as={Dashboard} role={1} path="/dashboard" />
                  <ProtectedRoute as={Home} role={1} path="/home" />

                  <ProtectedRoute as={Auth} role={1} path="/login" />
                  <ProtectedRoute as={Account} role={1} path="/" />
                  <ProtectedRoute as={Page404} role={1} path="/**" />
                </Switch>
              </main>

            </Container>
          </BrowserRouter>
        }

      </ThemeProvider>

    </div>
  )
}

