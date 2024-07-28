import React from 'react'
import classes from './Tag.module.scss'
import PropTypes from 'prop-types'
import { CreateButton } from '../Buttons/Buttons'

export default function Tag(props) {
    const { addTag, onDelete, index, maxIndex, value: defaultValue, setValue: setHOCValue } = props
    const [value, setValue] = React.useState(defaultValue)

    const addTagButton =
        addTag && Number(index) === maxIndex ? CreateButton({ message: 'Добавить тэг', mode: 'add', handler: addTag }) : null

    const deleteTagButton =
        onDelete && Number(index) !== 0
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
                    id={`Tags${index}`}
                    placeholder="Enter tagName"
                    defaultValue={defaultValue}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={(event) => {
                        setHOCValue(event.target.value.trim(), index)
                    }}
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
    index: PropTypes.string,
}
