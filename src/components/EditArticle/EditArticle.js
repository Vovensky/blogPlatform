import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classes from '../CreateArticle/ArticleForm.module.scss'
import TagList from '../TagList/TagList'
import { useChangeArticleMutation, useGetArticleDetailsQuery } from '../../RTK_Qeury/RealWorldAPI'
import { useSelector } from 'react-redux'

export default function EditArticle(props) {
    const [tagList, setTagList] = React.useState({ 0: '' })
    const { isLoggedIn } = useSelector((state) => state.articlesState)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' })
    let { slug } = props.params

    if (!slug) slug = window.location.pathname.split('/')[2]
    const { data, isError: errorGet } = useGetArticleDetailsQuery(slug)

    const [upload, setUpLoad] = React.useState(false)

    const [errorStatus, setErrorStatus] = React.useState(false)

    const [f, { isError, error }] = useChangeArticleMutation()

    React.useEffect(() => {
        let result
        if (data) {
            result = Object.keys(data?.article.tagList).length ? { ...data?.article.tagList } : { 0: '' }
        } else {
            result = { 0: '' }
        }
        setTagList({
            ...result,
        })
    }, [data])
    if (!isLoggedIn) return <Redirect to="/" />
    if (upload) return <Redirect to={`/articles/${upload.article.slug}`} />
    if (!data || errorGet)
        return (
            <div className={classes.CreateArticle__wrapper}>
                <div className={classes.info}> Данные отсутствуют </div>
            </div>
        )

    function getActualTags(value, mode) {
        if (mode === 'add') {
            setTagList((state) => {
                const maxIndex = Math.max.apply(null, Object.keys(state))
                const tagList = {
                    ...state,
                    [maxIndex + 1]: '',
                }
                console.log(tagList)
                return {
                    ...tagList,
                }
            })
        } else if (mode === 'delete') {
            setTagList((state) => {
                delete state[value]
                return {
                    ...state,
                }
            })
        } else {
            setTagList((state) => {
                return {
                    ...state,
                    [value.index]: value.value,
                }
            })
        }
    }

    async function upLoadFinalState(data) {
        data.tagList = [...Object.values(tagList)].filter((elem) => elem !== '')
        const obj = { article: data, id: slug }
        try {
            const result = await f(obj, slug)
            if (result.data) {
                setUpLoad(result.data)
            } else throw result.error

            if (isError) {
                setErrorStatus(error)
            }
        } catch (err) {
            return <div>{errorStatus}: произошла ошибка. Мы работаем над этим. </div>
        }
    }
    // async function finalState(data) {
    //     const arr1 = [...parentRef.current.values()].filter((elem) => elem !== '')
    //     let arr2 = articles[slug].tagList

    //     data.tagList = arr2.concat(arr1.slice(arr1.length - 1))

    //     const obj = { article: data }
    //     console.log(obj)
    //     try {
    //         const result = await f(JSON.stringify(obj, `hello`))
    //         if (result.data) setUpLoad(result.data)
    //         if (isError) {
    //             setErrorStatus(error)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <div className={classes.CreateArticle__wrapper}>
            <div className={classes.CreateArticle__container}>
                <h3>Edit article</h3>
                <div className={classes.CreateArticle__field}>
                    <label htmlFor="title" className={classes.CreateArticle__label}>
                        Title
                    </label>{' '}
                    <br />
                    <input
                        className={classes.CreateArticle__input}
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={data.article.title}
                        placeholder="Enter articles title"
                        {...register('title', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className={classes.CreateArticle__error}>{errors?.title?.message}</div>
                </div>
                <div className={classes.CreateArticle__field}>
                    <label htmlFor="description" className={classes.CreateArticle__label}>
                        Short description
                    </label>{' '}
                    <br />
                    <input
                        className={classes.CreateArticle__input}
                        type="text"
                        defaultValue={data.article.description}
                        name="description"
                        id="description"
                        placeholder="Enter artciels description"
                        {...register('description', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className={classes.CreateArticle__error}>{errors?.description?.message}</div>
                </div>
                <div className={classes.CreateArticle__field}>
                    <label htmlFor="text" className={classes.CreateArticle__label}>
                        Text
                    </label>{' '}
                    <br />
                    <textarea
                        defaultValue={data.article.body}
                        className={classes.CreateArticle__textArea}
                        maxLength="2000"
                        type="text"
                        name="text"
                        id="text"
                        placeholder="Enter situation"
                        {...register('body', {
                            required: 'Поле обязательно к заполнению',
                            maxLength: {
                                value: 2000,
                                message: 'Не более 2к символов',
                            },
                            minLength: {
                                value: 30,
                                message: 'не менее 30 символов',
                            },
                        })}
                    />
                    <div className={classes.CreateArticle__error}>{errors?.body?.message}</div>
                </div>
                <TagList tagList={tagList} getActualTags={getActualTags} />
                <button
                    type="submit"
                    className={classes.CreateArticle__buttonSend}
                    disabled={!isValid}
                    onClick={handleSubmit(upLoadFinalState)}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

EditArticle.propTypes = {
    slug: PropTypes.string,
    params: PropTypes.object,
}
