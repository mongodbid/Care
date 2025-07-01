import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Collect from './components/Collect';
import Data from './components/Data';

function App() {
  

  return (
    <>
      <BrowserRouter>
    <Routes>
       <Route path='admin' element={<Login/>}/>
       <Route path='collect' element={<Collect/>}/>
       <Route path='*' element={<Collect/>}/>
       <Route path='data' element={<Data/>}/>
       {/* <Route path='*' element={<Login/>}/>
       <Route path='welcome' element={<Welcome/>}/>
       <Route path='MFD' element={<MFD/>}/>
       <Route path='chatpage' element={<ChatPage/>}/>
       <Route path='corporateportfolio' element={<CorporatePortFolio/>}/>
       <Route path='dematportfolio' element={<DematPortfolio/>}/>
       <Route path='forgotpassword' element={<ForgotPassword/>}/>
       <Route path='createpassword' element={<ResetPassword/>}/>
       <Route path='description' element={<Description/>}/> */}
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
