import { React, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setArticlesSet } from '../../Redux_Store/ArticlesState/ArticlesState'
import { useGetArticlesQuery } from '../../RTK_Qeury/RealWorldAPI'
import Article from './Article/Article'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'

import classnames from './ArticlesList.module.scss'

function ArticlesList({ history }) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const { data, error, isError } = useGetArticlesQuery(page)

    useEffect(() => {
        if (data) {
            dispatch(setArticlesSet({ articlesData: data }))
        }
    }, [data, isError])

    if (isError) {
        return (
            <div className={classnames.articlesError}>
                Произошла ошибка на сервере, пожалуйста, перезагрузите страницу. Код ошибки: {error.status}
            </div>
        )
    } else if (!data) {
        return <div className={classnames.articlesError}>Данные не пришли</div>
    }
    const { articles } = data

    return (
        <div className={classnames.articlesList}>
            {articles.map((elem, index) => {
                const hash = String(index)
                    .split('')
                    .reduce((sum, elem) => sum + elem, index)
                return <Article articleInfo={elem} key={hash} onItemSelected={(slug) => history.push(`articles/${slug}`)} />
            })}
            <Pagination
                current={page}
                showSizeChanger={false}
                defaultPageSize={5}
                total={data.articlesCount}
                onChange={(page) => setPage(page)}
            ></Pagination>
        </div>
    )
}

ArticlesList.propTypes = {
    token: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
}

export default withRouter(ArticlesList)
