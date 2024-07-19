import { React } from 'react'
import PropTypes from 'prop-types'
import classes from './HeadPanel.module.scss'
import { usePostNewUserMutation } from '../../RTK_Qeury/RealWorldAPI'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function HeadPanel(props) {
    const { takeTokenNumber } = props
    const isLoggedIn = useSelector((state) => state.articlesState.isLoggedIn)
    const [f, { isError }] = usePostNewUserMutation({
        user: {
            username: 'zaloopa ivanovna',
            email: 'zaloopa@gmail.com',
            password: 'zaloopa_ivanovna@gmail.com',
        },
    })

    async function handleFunction() {
        if (isLoggedIn) {
            console.log('users already logged')
            return
        }
        const obj = {
            user: {
                username: 'zaloopaivanovna13371488',
                email: 'zaloopaivanovna14881337@gmail.com',
                password: '1234567890',
            },
        }
        try {
            if (isError) console.log(`Error in user object`)
            const result = await f(obj)
            const { token } = result.data.user
            console.log(takeTokenNumber)
            takeTokenNumber(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header className={classes.headPanel}>
            <Link to="/" className={classes.headPanel__link}>
                Realworld Blog
            </Link>
            <Link to="/sign-in" className={classes.headPanel__button} onClick={() => handleFunction()}>
                Sign In
            </Link>
            <Link to="/sign-up" className={classes.headPanel__button + ' ' + classes.headPanel__buttonLastChild}>
                Sign Up
            </Link>
        </header>
    )
}

HeadPanel.propTypes = {
    takeTokenNumber: PropTypes.func,
}
