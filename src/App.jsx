import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PhpTestFormPage from './pages/PhpTestFormPage'
import EditPhpTestForm from './pages/EditPhpTestForm'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'
import TestTypesTablePage from './pages/TestTypesTablePage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<HomePage />} />
            <Route
              exact
              path='/typesTablePage'
              element={<TestTypesTablePage />}
            />
            <Route exact path='/addphptest' element={<PhpTestFormPage />} />
            <Route exact path='/editTable/:id' element={<EditPhpTestForm />} />
          </Route>
          <Route exact path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
