import React from 'react'
import { useForm } from 'react-hook-form'
import classes from './Profile.module.scss'
import classess from '../AuthWindow/ModalWindow.module.scss'

export default function Profile() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        getValues,
    } = useForm({ mode: 'onBlur' })
    return (
        <div className={classess.authWindow}>
            <form
                onSubmit={handleSubmit((data) => console.log(data))}
                className={`${classess.authWindow__form} + ${classes.profileWindow}`}
            >
                <h3 className={classess.authWindow__title}>Edit profile</h3>
                <div className={classess.authWindow__field}>
                    <label htmlFor="userName" className={classes.authWindow__label}>
                        UserName
                    </label>{' '}
                    <br />
                    <input
                        className={classess.authWindow__input}
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter userName"
                        {...register('userName', {
                            required: 'Поле обязательно к заполнению',
                            minLength: {
                                value: 3,
                                message: 'В нике пользователя д.б. больше 3 символов',
                            },
                            maxLength: {
                                value: 20,
                                message: 'Не более 20 символов',
                            },
                        })}
                    />
                    <div className={classess.authWindow__error}>{errors?.userName?.message}</div>
                </div>
                <div className={classess.authWindow__field}>
                    <label htmlFor="email" className={classess.authWindow__label}>
                        Email address
                    </label>{' '}
                    <br />
                    <input
                        className={classess.authWindow__input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        {...register('email', {
                            requred: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            pattern: {
                                value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]+)/,
                                message: 'Мыло в неправильно форме',
                            },
                        })}
                    />
                    <div className={classess.authWindow__error}>{errors?.email?.message}</div>
                </div>
                <div className={classess.authWindow__field}>
                    <label htmlFor="password" className={classes.authWindow__label}>
                        New password
                    </label>{' '}
                    <br />
                    <input
                        className={classess.authWindow__input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: 'Поле обязательно к заполнению',
                            minLength: {
                                value: 6,
                                message: 'Не менее 6 символов',
                            },
                            maxLength: {
                                value: 40,
                                message: 'Не более 40 символов',
                            },
                        })}
                    />
                    <div className={classess.authWindow__error}>{errors?.password?.message}</div>
                </div>
                <div className={classess.authWindow__field}>
                    <label htmlFor="url" className={classess.authWindow__label}>
                        Avatar image (url)
                    </label>{' '}
                    <br />
                    <input
                        className={classess.authWindow__input}
                        type="url"
                        name="url"
                        id="url"
                        placeholder="image url"
                        {...register('passwordValidator', {
                            pattern: {
                                value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
                                message: 'Не соблюден формат url',
                            },
                        })}
                    />
                </div>
                <button type="submit" className={classess.authWindow__button}>
                    Save
                </button>
            </form>
        </div>
    )
}
