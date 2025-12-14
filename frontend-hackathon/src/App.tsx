import Home from './pages/home-screen'
import FaceVerificationScreen from './pages/FaceVerificationScreen'
import Identity from './pages/identity' 
import Region from './pages/region'
import ExperienseProofScreen from './pages/ExperienceProofScreen'

import './App.css'

function App() {

  return (
    <>
      <div>
        <Home/>
        <FaceVerificationScreen/>
        <Identity/>
        <Region/>
        <ExperienseProofScreen/>
      </div>
    </>
  )
}

export default App
