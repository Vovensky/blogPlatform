import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classes from '../CreateArticle/ArticleForm.module.scss'
import TagList from '../TagList/TagList'
import { useSelector } from 'react-redux'
import { useChangeArticleMutation } from '../../RTK_Qeury/RealWorldAPI'

export default function EditArticle(props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' })

    const [upload, setUpLoad] = React.useState(false)

    const [errorStatus, setErrorStatus] = React.useState(false)

    const { slug } = props.params

    const { username, articles } = useSelector((state) => state.articlesState)

    const [f, { isError, error }] = useChangeArticleMutation()

    function getActualTags(arr) {
        return arr
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
                <h3>Create article</h3>
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
                        defaultValue={articles[slug].title}
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
                        defaultValue={articles[slug].description}
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
                        defaultValue={articles[slug].body}
                        className={classes.CreateArticle__textArea}
                        type="text"
                        name="text"
                        id="text"
                        maxLength="300"
                        placeholder="Enter situation"
                        {...register('body', {
                            required: 'Поле обязательно к заполнению',
                        })}
                    />
                    <div className={classes.CreateArticle__error}>{errors?.text?.message}</div>
                </div>
                <TagList tagList={articles[slug].tagList} />
                <button type="submit" className={classes.CreateArticle__buttonSend} disabled={!isValid}>
                    Send
                </button>
            </div>
        </div>
    )
}

EditArticle.propTypes = {
    slug: PropTypes.string,
}
