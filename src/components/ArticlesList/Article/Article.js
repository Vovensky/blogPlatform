import React from 'react'
import PropTypes from 'prop-types'
import classes from './Article.module.scss'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Popconfirm, Button } from 'antd'
import {
    useDeleteArticleMutation,
    useFavoriteAnArticleMutation,
    useUnFavoriteAnArticleMutation,
} from '../../../RTK_Qeury/RealWorldAPI'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import svg from '../../../svg.svg'
import redSvg from '../../../svgRed.svg'

export default function Article(props) {
    const { articleInfo, onItemSelected, lever } = props

    const [isDeleted, setDeleted] = React.useState(false)
    let tags

    const [f] = useDeleteArticleMutation()
    const [like] = useFavoriteAnArticleMutation()
    const [unLike] = useUnFavoriteAnArticleMutation()

    const { username, isLoggedIn } = useSelector((state) => state.articlesState)

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

    if (isDeleted) {
        return <Redirect path="/" />
    }

    async function deleteButton(articleInfo) {
        try {
            await f(articleInfo)
            setDeleted(true)
        } catch (err) {
            return <div>Извините, произошла ошибка, удалите потом. А щас кыш атседова</div>
        }
    }
    let buttons
    let likes
    if (articleInfo.author.username === username && lever) {
        buttons = (
            <div className={classes.articleGroup__buttons}>
                <Link to={`/articles/${articleInfo.slug}/edit`}>
                    <button className={`${classes.articleGroup__button} ${classes.change} `}>Edit</button>
                </Link>
                <Popconfirm
                    title="Delete article?"
                    description="Are you sure to delete this article?"
                    onConfirm={async () => await deleteButton(articleInfo.slug)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </div>
        )
    }

    if (isLoggedIn) {
        if (articleInfo.favorited) {
            likes = (
                <>
                    <span className={classes.article__likes}>
                        <img
                            src={redSvg}
                            alt="like"
                            className={`${classes.article__heart} `}
                            onClick={() => unLike(articleInfo.slug)}
                        />
                    </span>
                    <span className={classes.article__likesCount}>{articleInfo.favoritesCount}</span>
                </>
            )
        } else {
            likes = (
                <>
                    <span className={classes.article__likes}>
                        <img src={svg} alt="like" className={classes.article__heart} onClick={() => like(articleInfo.slug)} />
                    </span>
                    <span className={classes.article__likesCount}>{articleInfo.favoritesCount}</span>
                </>
            )
        }
    }

    return (
        <div className={classes.article}>
            <div className={classes.article__info}>
                <div className={classes.article__title}>
                    <span onClick={() => onItemSelected(articleInfo.slug)}>{articleInfo.title}</span>
                    {likes}
                </div>
                <div className={classes.article__tags}>{tags || 'no tags'}</div>

                <div className={classes.article__content}>
                    {' '}
                    <Markdown>{articleInfo.description}</Markdown>
                </div>
            </div>
            <div className={classes.articleGroup}>
                <div className={classes.articleGroup__userInfo}>
                    <div className={classes.userInfo__authorName}>
                        <div className={classes.userInfo__userName}>{articleInfo.author.username}</div>
                        <div className={classes.userInfo__postDate}>{format('2024-07-28T12:24:53.522Z', 'MMMM dd yyyy')}</div>
                    </div>
                    <img src={articleInfo.author.image} className={classes.userInfo__image} />
                </div>
                {buttons}
            </div>
        </div>
    )
}

Article.propTypes = {
    articleInfo: PropTypes.object,
    onItemSelected: PropTypes.func,
    favoritesCount: PropTypes.number,
    lever: PropTypes.bool,
}
