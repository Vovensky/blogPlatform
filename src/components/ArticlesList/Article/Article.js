import { React } from 'react'
import PropTypes from 'prop-types'
import classes from './Article.module.scss'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'

export default function Article(props) {
    const { articleInfo, onItemSelected } = props
    let tags
    if (!articleInfo) return <div>Загружается</div>
    if (articleInfo.tagList?.length === 0) {
        tags = 'no tags'
    } else {
        tags = articleInfo.tagList?.map((elem, index) => (
            <div key={index} className={classes.article__tag}>
                {elem}
            </div>
        ))
    }

    return (
        <div className={classes.article}>
            <div className={classes.article__info}>
                <div className={classes.article__title} onClick={() => onItemSelected(articleInfo.slug)}>
                    {articleInfo.title}
                </div>
                <div className={classes.article__tags}>{tags || 'no tags'}</div>

                <div className={classes.article__content}>
                    {' '}
                    <Markdown>{articleInfo.description}</Markdown>
                </div>
            </div>
            <div className={classes.article__userInfo}>
                <div className={classes.userInfo__authorName}>
                    <div className={classes.userInfo__userName}>{articleInfo.author.username}</div>
                    <div className={classes.userInfo__postDate}>ДАТА</div>
                </div>
                <img src={articleInfo.author.image} className={classes.userInfo__image} />
            </div>
            <Link to={`/articles/${articleInfo.slug}/edit`}>
                <button>Edit article</button>
            </Link>
        </div>
    )
}

Article.propTypes = {
    articleInfo: PropTypes.object,
    onItemSelected: PropTypes.func,
}
