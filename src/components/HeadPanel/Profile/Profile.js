import React from 'react'
import { useForm } from 'react-hook-form'
import classes from './Profile.module.scss'
import classess from '../AuthWindow/ModalWindow.module.scss'
import { useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../../../RTK_Qeury/RealWorldAPI'

export default function Profile() {
    const { username, email, password } = useSelector((state) => state.articlesState)
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({ mode: 'onBlur' })
    const [f, { isError }] = useUpdateUserMutation()

    async function updateProfile(body) {
        await f({ user: body })
        if (isError) {
            return <div>Произошла ошибка</div>
        }
    }
    return (
        <div className={classess.authWindow}>
            <form
                onSubmit={handleSubmit(async (data) => updateProfile(data))}
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
                        defaultValue={username}
                        placeholder="Enter userName"
                        {...register('username', {
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
                        defaultValue={email}
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
                        Password
                    </label>{' '}
                    <br />
                    <input
                        className={classess.authWindow__input}
                        defaultValue={password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: 'Введи иначе сервер снесет пароль',
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
                        {...register('image', {
                            pattern: {
                                value: /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
                                message: 'Не соблюден формат url',
                            },
                        })}
                    />
                </div>
                <button type="submit" className={classess.authWindow__button} disabled={!isValid}>
                    Save
                </button>
            </form>
        </div>
    )
}
