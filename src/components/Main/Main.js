import { React, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import classes from './Main.module.scss'

import ArticlesList from '../ArticlesList/ArticlesList'
import ArticleDetails from '../ArticlesList/ArticleDetails/ArticleDetails'

export default function Main() {
    const token = useSelector((state) => state.articlesState.token)
    useEffect(() => {
        console.log(`token updated`)
    }, [token])
    // const [f, {data}] = usePostNewUserMutation({
    //     user: {
    //         username: 'zaloopa ivanovna',
    //         email: 'zaloopa@gmail.com',
    //         password: 'zaloopa_ivanovna@gmail.com',
    //     },
    // })
    // console.log(token)
    // useEffect(() => {
    //     console.log('refetch')
    // }, [token])
    return (
        <main className={classes.mainContentContainer}>
            <Switch>
                <Route
                    path="/articles/:slug"
                    render={({ match }) => {
                        return <ArticleDetails {...match} />
                    }}
                />

                <Route path="/">
                    <ArticlesList />
                </Route>
                <Route path="/articles">
                    <ArticlesList />
                </Route>
                <Route path="/sign-in">
                    <div className={classes.articlesList}>Sign-IN</div>
                </Route>
                <Route path="/sign-up">
                    <div className={classes.articlesList}>Sign-UP</div>
                </Route>
            </Switch>
        </main>
    )
}
