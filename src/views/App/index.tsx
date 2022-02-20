import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProfileListComponent from '../../components/ProfileList';
import ProfileView from '../ProfileView'
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import store from '../../store'
import routes from '../../routes'
import { Nav, Form } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef } from 'react';
import { addSearchValue, changeShowPerPage } from '../../reducers/profileSlice';
import { ItemsPerPage, SearchItem } from '../../models';

const App: React.FC = (props) => {

  const location = useLocation()
  const currentItemPerPage = useAppSelector(state => state.profileSlice.showPerPage)

  const dispatch = useAppDispatch()

  const changeItemPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {

    var value = (event.currentTarget as HTMLSelectElement).value
    if (value != null) {
      dispatch(changeShowPerPage({ value: parseInt(value) } as ItemsPerPage))
    }

  }

  const search = (event: React.KeyboardEvent<HTMLInputElement>) => {
    var value = (event.currentTarget as HTMLInputElement).value

    if (value != null) {
      dispatch(addSearchValue({ value } as SearchItem))
    }

  }

  return (


    <div className="App">
      <header className="App-header">
        <div className='fit-content float-left'>
          <p className="display-6">Talent Hub</p>
          <p className="lead">We have the right talent just for you</p>
        </div>
        <div className="float-right mt-4 me-3">
          <div className='d-flex'>
            <Form.Select className='fit-content me-2' onChange={changeItemPerPage} >
              {new Array(10).fill(0).map((_, i) => {
                var item = i + 1
                if (currentItemPerPage == item) { 
                  return <option selected> {i + 1} </option>
                }
                return <option> {item} </option>
              })
              }
            </Form.Select>
            <Form.Control className='fit-content' type="text" onKeyUp={search} placeholder="Search by job title, years of experience, city, country" />
          </div>
          </div>
      </header>

      <section className='container w-80 m-auto mb-4'>
        <Nav
          activeKey="/home"
        >
          {routes.map(({ path, prop }, key) => (

            <Nav.Item key={key} className={location.pathname == path ? 'activeNav' : ''} >
              <Link className="nav-link" to={path}>{prop.pageName.toUpperCase()}</Link>
            </Nav.Item>

          )
          )}

        </Nav>
      </section >

      <section className='container w-80 m-auto'>

        <Routes>
          {routes.map(({ Component, path, prop }, key) =>
            <Route key={key} path={path} element={<Component {...prop} />} />)}

        </Routes>


      </section>
    </div>
  );
}

export default App;
