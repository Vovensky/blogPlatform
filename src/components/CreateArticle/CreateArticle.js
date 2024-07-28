import { React, useState } from 'react'
import classes from './ArticleForm.module.scss'
import { useForm } from 'react-hook-form'
import TagList from '../TagList/TagList'
import { usePostNewArticleMutation } from '../../RTK_Qeury/RealWorldAPI'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function CreateArticle() {
    const [tagList, setTagList] = useState([''])
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onBlur',
    })
    const { isLoggedIn } = useSelector((state) => state.articlesState)
    const [upload, setUpLoad] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [f, { isError, error }] = usePostNewArticleMutation()

    async function upLoadFinalState(data) {
        data.tagList = [...Object.values(tagList)].filter((elem) => elem !== '')
        const obj = { article: data }
        try {
            const result = await f(JSON.stringify(obj))
            if (result.data) setUpLoad(result.data)
            if (isError) {
                setErrorStatus(error)
            }
        } catch (err) {
            return <div>{errorStatus}: произошла ошибка. Мы работаем над этим. </div>
        }
    }

    function getActualTags(value, mode) {
        if (mode === 'add') {
            setTagList((state) => {
                const maxIndex = Math.max.apply(null, Object.keys(state))
                const tagList = {
                    ...state,
                    [maxIndex + 1]: '',
                }
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

    if (upload) return <Redirect to={`/articles/${upload.article.slug}`} />
    else if (!isLoggedIn) return <Redirect to={`/`} />

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
                <TagList tagList={tagList} getActualTags={getActualTags} />
                <button
                    type="button"
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
