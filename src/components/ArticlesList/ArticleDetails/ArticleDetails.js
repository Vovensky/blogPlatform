import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import Article from '../Article/Article'

import classes from './ArticleDetails.module.scss'

export default function ArticleDetails(props) {
    const { slug } = props.params
    let articleData = useSelector((state) => state.articlesState)
    let markDown = undefined
    try {
        markDown = articleData.articles[slug]
    } catch (err) {
        console.log(err)
        return <Redirect to="/" />
    }

    return (
        <div className={classes.articleDetailsContainer}>
            <Article articleInfo={markDown} />
            <div className={classes.articleDetails__body}>
                <Markdown>{markDown.body}</Markdown>
            </div>
        </div>
    )
}

ArticleDetails.propTypes = {
    match: PropTypes.object,
    slug: PropTypes.string,
    params: PropTypes.object,
}
