import { React } from 'react'
import PropTypes from 'prop-types'
import classes from './HeadPanel.module.scss'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function HeadPanel() {
    const isLoggedIn = useSelector((state) => state.articlesState.isLoggedIn)

    if (!isLoggedIn) {
        return (
            <header className={classes.headPanel}>
                <Link to="/" className={classes.headPanel__link}>
                    Realworld Blog
                </Link>
                <Link to="/sign-in" className={classes.headPanel__button}>
                    Sign In
                </Link>
                <Link to="/sign-up" className={classes.headPanel__button + ' ' + classes.headPanel__buttonLastChild}>
                    Sign Up
                </Link>
            </header>
        )
    }
    return (
        <header className={classes.headPanel}>
            <Link to="/" className={classes.headPanel__link}>
                Realworld Blog
            </Link>
            <Link to="/profile" className={classes.headPanel__button}>
                PROFILE EPTIBLYAT
            </Link>
        </header>
    )
}

HeadPanel.propTypes = {
    takeTokenNumber: PropTypes.func,
}
