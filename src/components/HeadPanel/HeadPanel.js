import { React } from 'react'
import PropTypes from 'prop-types'
import classes from './HeadPanel.module.scss'
import UsersProfilePanel from './UsersProfilePanel/UsersProfilePanel'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function HeadPanel() {
    const { isLoggedIn, username } = useSelector((state) => state.articlesState)
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
            <UsersProfilePanel {...username} />
        </header>
    )
}

HeadPanel.propTypes = {
    takeTokenNumber: PropTypes.func,
}
