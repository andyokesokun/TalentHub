import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProfileListComponent from '../../components/ProfileList';
import HomeView from '../HomeView'
import { Provider } from 'react-redux';
import store from '../../store'


function App() {
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
           <HomeView />
        </section>
      

      </div>
    </Provider>
  );
}

export default App;
