import { React, useState, useEffect } from 'react'
import classes from './TagList.module.scss'
import Tag from '../Tag/Tag'
import PropTypes from 'prop-types'

export default function TagList(props) {
    const { tagList } = props
    const [tagsState, setTagsState] = useState({ tagList: { ...tagList } })

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

    useEffect(() => {}, [tagsState])

    function addTag() {
        setTagsState((state) => {
            console.log(`added`)
            const maxIndex = Math.max.apply(null, Object.keys(state.tagList))
            return {
                tagList: {
                    ...state.tagList,
                    [maxIndex + 1]: '',
                },
            }
        })
    }

    function deleteTag(index) {
        console.log(`deleted`)
        setTagsState((state) => {
            delete state.tagList[index]
            return {
                tagList: state.tagList,
            }
        })
    }

    function setValue(index, value) {
        setTagsState((state) => {
            return {
                tagList: {
                    ...state.tagList,
                    [index]: value,
                },
            }
        })
    }

    return (
        <div className={classes.Tags__container}>
            <div className={classes.Tags__label}>Tags</div>
            <div className={classes.TagList}>{createTags(tagsState.tagList)}</div>
        </div>
    )
}

TagList.propTypes = {
    parentRef: PropTypes.object,
    tagList: PropTypes.array,
}
