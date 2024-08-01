import { React } from 'react'
import Main from './components/Main/Main'
import HeadPanel from './components/HeadPanel/HeadPanel'
import './App.css'
import { useDispatch } from 'react-redux'
import { setUsersData } from './Redux_Store/ArticlesState/ArticlesState'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'

function App() {
    const dispatch = useDispatch()
    function takeTokenNumber(tokenNumber) {
        dispatch(setUsersData(tokenNumber))
    }
    return (
        <ConfigProvider
            theme={{
                components: {
                    Pagination: {
                        itemActiveBg: 'rgba(24, 144, 255, 1)',
                        colorPrimary: 'white',
                        colorBgContainer: 'inherit',
                    },
                },
            }}
        >
            <Router>
                <HeadPanel takeTokenNumber={takeTokenNumber} />
                <Main />
            </Router>
        </ConfigProvider>
    )
}

export default App
