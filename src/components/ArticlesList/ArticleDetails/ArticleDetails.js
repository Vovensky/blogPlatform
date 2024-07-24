import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import Article from '../Article/Article'
import { useGetArticleDetailsQuery } from '../../../RTK_Qeury/RealWorldAPI'

import classes from './ArticleDetails.module.scss'

export default function ArticleDetails(props) {
    let { slug } = props.params
    if (!slug) slug = window.location.pathname.split('/')[2]
    const { data } = useGetArticleDetailsQuery(slug)
    if (data) {
        return (
            <div className={classes.articleDetailsWrapper}>
                <div className={classes.articleDetailsContainer}>
                    <Article articleInfo={data.article} onItemSelected={() => {}} />
                    <div className={classes.articleDetails__body}>
                        <Markdown>{data.article.body}</Markdown>
                    </div>
                </div>
            </div>
        )
    }
    return <div>Загружается </div>
}

ArticleDetails.propTypes = {
    match: PropTypes.object,
    slug: PropTypes.string,
    params: PropTypes.object,
}
