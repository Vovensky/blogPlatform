import { React, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setArticlesSet } from '../../Redux_Store/ArticlesState/ArticlesState'
import { useGetArticlesQuery } from '../../RTK_Qeury/RealWorldAPI'
import Article from './Article/Article'
import { withRouter } from 'react-router-dom'

import classnames from './ArticlesList.module.scss'

// import { usePostNewUserMutation } from '../../RTK_Qeury/RealWorldAPI'

function ArticlesList({ history }) {
    const token = useSelector((state) => state.articlesState.token)
    const dispatch = useDispatch()
    const { data, error, isError } = useGetArticlesQuery()
    useEffect(() => {
        return () => console.log('component was destructed')
    }, [token, data, isError])

    if (isError) {
        return (
            <div className={classnames.articlesError}>
                Произошла ошибка на сервере, пожалуйста, перезагрузите страницу. Код ошибки: {error.status}
            </div>
        )
    } else if (!data) {
        return <div className={classnames.articlesError}>Данные не пришли</div>
    }
    const { articles, articlesCount } = data
    dispatch(setArticlesSet({ articles }))
    return (
        <div className={classnames.articlesList}>
            {articles.map((elem, index) => {
                const hash = String(index)
                    .split('')
                    .reduce((sum, elem) => sum + elem, index)
                return <Article articleInfo={elem} key={hash} onItemSelected={(slug) => history.push(`articles/${slug}`)} />
            })}
        </div>
    )
}

ArticlesList.propTypes = {
    token: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
}

export default withRouter(ArticlesList)
