import React from 'react'
import { useGetProfileQuery } from '../../../RTK_Qeury/RealWorldAPI'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import classes from '../HeadPanel.module.scss'

export default function UsersProfilePanel(username) {
    const { data } = useGetProfileQuery(username)
    return (
        <Link to="/profile" className={classes.headPanel__button}>
            <div className={classes.headPanel__ProfileLink}>
                <div className={classes.headPanel__profileName}>{data.profile?.username}</div>
                <img src={data.profile?.image} alt="profile__image" className={classes.headPanel__ProfileImage} />
            </div>
        </Link>
    )
}
