import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard, Balance, Debts, Stock, NotFound } from './views';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Sidebar />
        <div className='page'>
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/balance' component={Balance} />
            <Route path='/debts' component={Debts} />
            <Route path='/stock' component={Stock} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
