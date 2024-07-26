import { React } from 'react'
// import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import classes from './Main.module.scss'

import ArticlesList from '../ArticlesList/ArticlesList'
import ArticleDetails from '../ArticlesList/ArticleDetails/ArticleDetails'
import AuthWindow from '../HeadPanel/AuthWindow/AuthWindow'
import Profile from '../HeadPanel/Profile/Profile'
import CreateArticle from '../CreateArticle/CreateArticle'
import EditArticle from '../EditArticle/EditArticle'
import { setUsersData } from '../../Redux_Store/ArticlesState/ArticlesState'
import { useDispatch } from 'react-redux'

export default function Main() {
    const dispatch = useDispatch()
    if (sessionStorage.getItem('storageData')) dispatch(setUsersData({ ...JSON.parse(sessionStorage.getItem('storageData')) }))
    return (
        <main className={classes.mainContentContainer}>
            <Switch>
                <Route
                    path="/articles/:slug"
                    exact
                    render={({ match }) => {
                        return <ArticleDetails {...match} />
                    }}
                />
                <Route
                    exact
                    path="/articles/:slug/edit"
                    render={({ match }) => {
                        return <EditArticle {...match} />
                    }}
                ></Route>
                <Route path="/new-article">
                    <CreateArticle />
                </Route>

                <Route path="/" exact>
                    <ArticlesList />
                </Route>
                <Route path="/articles">
                    <ArticlesList />
                </Route>
                <Route path="/sign-in">
                    <AuthWindow lever={false} />
                </Route>
                <Route path="/sign-up">
                    <AuthWindow lever={true} />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </main>
    )
}
