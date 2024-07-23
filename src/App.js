import { React } from 'react'
import Main from './components/Main/Main'
import HeadPanel from './components/HeadPanel/HeadPanel'
import './App.css'
import { useDispatch } from 'react-redux'
import { setUsersData } from './Redux_Store/ArticlesState/ArticlesState'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    const dispatch = useDispatch()
    function takeTokenNumber(tokenNumber) {
        dispatch(setUsersData(tokenNumber))
    }
    console.log(localStorage.getItem('token'))
    return (
        <Router>
            <HeadPanel takeTokenNumber={takeTokenNumber} />
            <Main />
        </Router>
    )
}

export default App
