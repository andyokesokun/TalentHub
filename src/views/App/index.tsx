import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProfileListComponent from '../../components/ProfileList';
import HomeView from '../HomeView'
import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import store from '../../store'
import routes from '../../routes'
import { Nav } from 'react-bootstrap'

const App: React.FC = (props) => {

  const location = useLocation()


  return (
      <Provider store={store}>

        <div className="App">
          <header className="App-header">
            <div className='d-flex flex-column'>
              <p className="display-6">Talent Hub</p>
              <p className="lead">We have the right talent just for you</p>
            </div>
          </header>

          <section className='container w-80 m-auto'>
            <Nav
              activeKey="/home"
            >
              {routes.map(({ path }, key) => (

                <Nav.Item key={key} className={location.pathname == path ? 'activeNav' : '' } >
                  <Nav.Link href={path}>Home</Nav.Link>
                </Nav.Item>

              )
              )}

            </Nav>
          </section >

          <section className='container w-80 m-auto'>

            <Routes>
              {routes.map(({ Component, path, ...others }, key) =>
                <Route key={key} path={path} element={<Component {...others} />} />)}

            </Routes>


          </section>
        </div>

      </Provider>

  );
}

export default App;
