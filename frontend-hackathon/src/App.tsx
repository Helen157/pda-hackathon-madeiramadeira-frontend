import Home from './pages/home-screen'
import FaceVerificationScreen from './pages/FaceVerificationScreen'
import Identity from './pages/identity' 
import Region from './pages/region'
import './App.css'

function App() {

  return (
    <>
      <div>
        <Home/>
        <FaceVerificationScreen/>
        <Identity/>
        <Region/>
      </div>
    </>
  )
}

export default App
