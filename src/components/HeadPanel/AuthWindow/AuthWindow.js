import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './ModalWindow.module.scss'
import { useForm } from 'react-hook-form'
import { usePostNewUserMutation, useLogInMutation } from '../../../RTK_Qeury/RealWorldAPI'
import { setUsersData } from '../../../Redux_Store/ArticlesState/ArticlesState'

export default function AuthWindow(props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        getValues,
    } = useForm({
        mode: 'onBlur',
    })

    const { isLoggedIn } = useSelector((state) => state.articlesState)

    const dispatch = useDispatch()

    const [f, { isError }] = usePostNewUserMutation()

    async function registerNewUser(data) {
        const { email, password, userName: username } = data
        const obj = {
            user: {
                email: email.toLowerCase(),
                password: password.toLowerCase(),
                username: username.toLowerCase(),
            },
        }
        try {
            if (isError) console.log(`Error in user object`)
            const result = await f(obj)
            if (result.data) {
                const { email, username, token } = result.data.user
                const toStorage = {
                    isLoggedIn,
                    username,
                    email,
                    token,
                }
                sessionStorage.setItem('storageData', JSON.stringify(toStorage))
                dispatch(setUsersData({ email: email, username: username, token: token, password: password }))
            } else if (result.error) {
                const { data } = result.error

                const arr = Object.entries(data.errors).map((elem) => elem.join(' '))
                alert(arr)
            }
        } catch (err) {
            console.log(err)
        }
        reset()
    }

    const [func, { isError: error }] = useLogInMutation()
    async function logIn(data) {
        const { email, password } = data
        const obj = {
            user: {
                email: email.toLowerCase(),
                password: password.toLowerCase(),
            },
        }
        try {
            if (error) console.log(`Error in user object`)
            const result = await func(obj)
            if (result.data) {
                const { email, username, token } = result.data.user
                const toStorage = {
                    isLoggedIn,
                    username,
                    email,
                    token,
                }
                sessionStorage.setItem('storageData', JSON.stringify(toStorage))
                dispatch(setUsersData({ email: email, username: username, token: token, password: password.toLowerCase() }))
            } else if (result.error) {
                const { data } = result.error

                const arr = Object.entries(data.errors).map((elem) => elem.join(' '))
                alert(arr)
            }
            // const { token } = result.data.user
            // setUsersToken(token)
        } catch (err) {
            console.log(err)
        }
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }
    const { lever } = props
    if (lever) {
        return (
            <div className={classes.authWindow}>
                <form method="POST" className={classes.authWindow__form} onSubmit={handleSubmit(registerNewUser)}>
                    <h3 className={classes.authWindow__title}>Create new accout</h3>
                    <div className={classes.authWindow__field}>
                        <label htmlFor="userName" className={classes.authWindow__label}>
                            UserName
                        </label>{' '}
                        <br />
                        <input
                            className={classes.authWindow__input}
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
                        <div className={classes.authWindow__error}>{errors?.userName?.message}</div>
                    </div>
                    <div className={classes.authWindow__field}>
                        <label htmlFor="email" className={classes.authWindow__label}>
                            Email address
                        </label>{' '}
                        <br />
                        <input
                            className={classes.authWindow__input}
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
                        <div className={classes.authWindow__error}>{errors?.email?.message}</div>
                    </div>
                    <div className={classes.authWindow__field}>
                        <label htmlFor="password" className={classes.authWindow__label}>
                            Password
                        </label>{' '}
                        <br />
                        <input
                            className={classes.authWindow__input}
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
                        <div className={classes.authWindow__error}>{errors?.password?.message}</div>
                    </div>
                    <div className={classes.authWindow__field}>
                        <label htmlFor="repeat__password" className={classes.authWindow__label}>
                            Repeat password
                        </label>{' '}
                        <br />
                        <input
                            className={classes.authWindow__input}
                            type="password"
                            name="repeat__password"
                            id="repeat__password"
                            placeholder="Repeat password"
                            maxLength="30"
                            minLength="6"
                            {...register('passwordValidator', {
                                validate: {
                                    positive: (value) => {
                                        const { password } = getValues()
                                        return value === password || 'Пароли должны совпадать'
                                    },
                                },
                            })}
                        />
                    </div>
                    <div className={classes.authWindow__error}>{errors?.passwordValidator?.message}</div>
                    <div className={`${classes.authWindow__field} ${classes.authWindow__fieldStylised} `}>
                        <input
                            type="checkBox"
                            id="agreement"
                            name="agreement"
                            {...register('agreement', {
                                required: {
                                    value: true,
                                },
                            })}
                        />
                        <label
                            htmlFor="agreement"
                            className={errors?.agreement ? classes.authWindow_agreementFalse : classes.authWindow__agreement}
                        >
                            I agree to the processing of my personal information
                        </label>
                    </div>
                    <button type="submit" className={classes.authWindow__button} disabled={!isValid}>
                        Create
                    </button>
                    <div className={classes.authForm__footer}>
                        {' '}
                        Already have an account?{' '}
                        <Link to="/sign-in" className={classes.AuthWindow__Link}>
                            Sign in.
                        </Link>{' '}
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className={classes.authWindow}>
            <form method="POST" className={classes.authWindow__form} onSubmit={handleSubmit(logIn)}>
                <h3 className={classes.authWindow__title}>Sign in</h3>
                <div className={classes.authWindow__field}>
                    <label className={classes.authWindow__label} htmlFor="email">
                        Email address
                    </label>{' '}
                    <br />
                    <input
                        defaultValue="helloworld1337228@gmail.com"
                        className={classes.authWindow__input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Введите email',
                            },
                            pattern: {
                                value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z_-]+)/,
                                message: 'Мыло в неправильно форме',
                            },
                        })}
                    />
                    <div className={classes.authWindow__error}>{errors?.email?.message}</div>
                </div>
                <div className={classes.authWindow__field}>
                    <label className={classes.authWindow__label} htmlFor="password">
                        Пароль
                    </label>{' '}
                    <br />
                    <input
                        defaultValue="1234567890"
                        className={classes.authWindow__input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        {...register('password', {
                            required: 'Введите пароль',
                            minLength: {
                                value: 6,
                                message: 'В пароле минимум 6 символов',
                            },
                        })}
                    />
                    <div className={classes.authWindow__error}>{errors?.password?.message}</div>
                </div>
                <button type="submit" className={classes.authWindow__button}>
                    Login
                </button>
                <div className={classes.authForm__footer}>
                    {' '}
                    Dont have an account?{' '}
                    <Link to="/sign-up" className={classes.AuthWindow__Link} o>
                        Sign up.
                    </Link>{' '}
                </div>
            </form>
        </div>
    )
}

AuthWindow.propTypes = {
    lever: PropTypes.bool,
}
