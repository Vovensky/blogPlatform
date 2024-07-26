import React from 'react'
import classes from './Tag.module.scss'
import PropTypes from 'prop-types'
import { CreateButton } from '../Buttons/Buttons'

export default function Tag(props) {
    const { addTag, onDelete, reference, index } = props
    const [value, setValue] = React.useState('')

    const addTagButton = addTag ? CreateButton({ message: 'Добавить тэг', mode: 'add', handler: addTag }) : null
    const deleteTagButton =
        onDelete && index !== 0
            ? CreateButton({
                  message: 'Удалить тэг',
                  mode: 'delete',
                  handler: onDelete,
                  parentRef: props.parentRef,
                  value: value,
              })
            : null
    return (
        <>
            <div className={classes.TagContainer}>
                <input
                    className={classes.Tag__input}
                    type="text"
                    name="Tags"
                    id="Tags"
                    placeholder="Enter tagName"
                    ref={reference}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={(event) => props.parentRef.current.add(event.target.value.trim())}
                />
                {addTagButton}
                {deleteTagButton}
            </div>
        </>
    )
}

Tag.propTypes = {
    reference: PropTypes.object,
    onDelete: PropTypes.func,
    addTag: PropTypes.func,
    parentRef: PropTypes.object,
    index: PropTypes.number,
}
