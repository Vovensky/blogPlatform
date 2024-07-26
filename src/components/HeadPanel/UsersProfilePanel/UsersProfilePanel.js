import React from 'react'
import { useGetProfileQuery } from '../../../RTK_Qeury/RealWorldAPI'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import classes from '../HeadPanel.module.scss'
import PropTypes from 'prop-types'
import { resetData } from '../../../Redux_Store/ArticlesState/ArticlesState'
import { useDispatch } from 'react-redux'

export default function UsersProfilePanel(props) {
    const { data } = useGetProfileQuery(props.username.username)
    const dispatch = useDispatch()
    return (
        <>
            <Link to="/profile" className={classes.headPanel__button}>
                <div className={classes.headPanel__ProfileLink}>
                    <div className={classes.headPanel__profileName}>{data?.profile?.username}</div>
                    <img src={data?.profile?.image} alt="profile__image" className={classes.headPanel__ProfileImage} />
                </div>
            </Link>
            <button
                type="button"
                className={`${classes.headPanel__button} ${classes.logOutButton}`}
                onClick={() => {
                    sessionStorage.removeItem('storageData')
                    dispatch(resetData())
                }}
            >
                Log out
            </button>
        </>
    )
}

UsersProfilePanel.propTypes = {
    username: PropTypes.object,
}
