import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProfileListComponent from '../../components/ProfileList';
import HomeView from '../HomeView'
import { Route, Routes, useLocation } from 'react-router-dom';
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
  const itemPerPagSelEle = useRef<HTMLSelectElement>(null)
  const searchFormEle = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const changeItemPerPage = () => {

    var value = itemPerPagSelEle.current?.value
    if (value != null) {
      dispatch(changeShowPerPage({ value: parseInt(value) } as ItemsPerPage))
    }

  }

  const search = () => {
    var value = searchFormEle.current?.value
  
    if (value != null) {
        dispatch(addSearchValue({ value} as SearchItem))
    }

  }

  return (


    <div className="App">
      <header className="App-header">
        <div className='d-flex flex-column'>
          <p className="display-6">Talent Hub</p>
          <p className="lead">We have the right talent just for you</p>
        </div>
        <div className="d-flex">
          <Form.Select size="lg" ref={itemPerPagSelEle} onChange={changeItemPerPage} >
            {new Array(10).fill(0).map((_, i) => {
              var item = i + 1
              if (currentItemPerPage == item) {
                return <option selected> {i + 1} </option>
              }
              return <option> {item} </option>
            })
            }
          </Form.Select>
          <Form.Control size="lg" ref ={searchFormEle} type="text" onKeyUp={search} placeholder="Search by job title, years of experience, city, country" />

        </div>
      </header>

      <section className='container w-80 m-auto'>
        <Nav
          activeKey="/home"
        >
          {routes.map(({ path }, key) => (

            <Nav.Item key={key} className={location.pathname == path ? 'activeNav' : ''} >
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
  );
}

export default App;
