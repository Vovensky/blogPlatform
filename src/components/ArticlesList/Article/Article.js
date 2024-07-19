import { React } from 'react'
import PropTypes from 'prop-types'
import classes from './Article.module.scss'
import Markdown from 'react-markdown'

export default function Article(props) {
    const { articleInfo: article, onItemSelected } = props
    const tags = article.tagList.map((elem, index) => (
        <div key={index} className={classes.article__tag}>
            {elem}
        </div>
    ))
    return (
        <div className={classes.article}>
            <div className={classes.article__info}>
                <div className={classes.article__title} onClick={() => onItemSelected(article.slug)}>
                    {article.title}
                </div>
                <div className={classes.article__tags}>{tags}</div>

                <div className={classes.article__content}>
                    {' '}
                    <Markdown>{article.description}</Markdown>
                </div>
            </div>
            <div className={classes.article__userInfo}>
                <div className={classes.userInfo__authorName}>
                    <div className={classes.userInfo__userName}>{article.author.username}</div>
                    <div className={classes.userInfo__postDate}></div>
                </div>
                <img src={article.author.image} className={classes.userInfo__image} />
            </div>
        </div>
    )
}

Article.propTypes = {
    articleInfo: PropTypes.object,
    onItemSelected: PropTypes.func,
}
