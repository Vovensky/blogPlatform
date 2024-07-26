import React from 'react'
import classes from './Buttons.module.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export function CreateArticleButton() {
    return (
        <Link to="/new-article">
            <button className={classes.CreateArticleButton}>Create article</button>
        </Link>
    )
}

export function CreateButton(options) {
    if (options.mode === 'delete')
        return (
            <button
                type="text"
                onClick={() => {
                    options.handler()
                    options.parentRef.current.delete(options.value)
                }}
                className={classes.deleteButton}
            >
                {options.message}
            </button>
        )
    else if (options.mode === 'add')
        return (
            <button type="text" onClick={options.handler} className={classes.addButton}>
                {options.message}
            </button>
        )
}
