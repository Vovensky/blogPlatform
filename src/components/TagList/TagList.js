import { React, useState, useEffect } from 'react'
import classes from './TagList.module.scss'
import Tag from '../Tag/Tag'
import PropTypes from 'prop-types'

export default function TagList(props) {
    const { tagList, getActualTags } = props

    function createTags(arr) {
        const maxIndex = Math.max.apply(null, Object.keys(arr))
        return Object.entries(arr).map(([key, value]) => {
            const hash = String(key + key) + key
            return (
                <Tag
                    index={key}
                    value={value}
                    maxIndex={maxIndex}
                    key={hash}
                    addTag={() => addTag()}
                    onDelete={() => deleteTag(key)}
                    setValue={(value, index) => setValue(index, value)}
                />
            )
        })
    }

    function addTag() {
        getActualTags(null, 'add')
    }

    function deleteTag(index) {
        getActualTags(index, 'delete')
    }

    function setValue(index, value) {
        getActualTags({ index, value }, 'set')
    }

    return (
        <div className={classes.Tags__container}>
            <div className={classes.Tags__label}>Tags</div>
            <div className={classes.TagList}>{createTags(tagList)}</div>
        </div>
    )
}

TagList.propTypes = {
    parentRef: PropTypes.object,
    tagList: PropTypes.object,
    getActualTags: PropTypes.func,
}
