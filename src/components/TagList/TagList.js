import { React, useState, useRef, useEffect } from 'react'
import classes from './TagList.module.scss'
import Tag from '../Tag/Tag'
import PropTypes from 'prop-types'

export default function TagList(props) {
    const base = {
        title: '',
        index: 0,
        delete: true,
        add: true,
    }

    useEffect(() => {
        console.log(`rerender`)
    }, [props])

    const [tag, setTags] = useState({
        count: 0,
        tags: [{ index: 0, delete: true, add: true }],
    })
    const inputsRef = useRef(null)

    function addTag() {
        setTags((state) => {
            const arr = state.tags
            arr.push(base)
            return {
                count: state.count + 1,
                tags: arr,
            }
        })
    }
    function onDelete(index, parentRef) {
        setTags((state) => {
            return {
                count: state.count - 1,
                tags: state.tags.slice(0, index).concat(state.tags.slice(index + 1)),
            }
        })
    }
    function createTags() {
        const arr = []
        const { count, ...tags } = tag
        for (let i = 0; i <= count; i++) {
            const hash = String(i) + i

            arr.push(
                <Tag
                    data={tags.tags[i]}
                    key={hash}
                    index={i}
                    onDelete={() => onDelete(i)}
                    addTag={() => addTag()}
                    parentRef={props.parentRef}
                />,
            )
        }
        return arr
    }

    return (
        <>
            <div onClick={() => inputsRef.current.focus()} className={classes.Tags__label}>
                Tags
            </div>
            <div className={classes.TagList}>{createTags()}</div>
        </>
    )
}

TagList.propTypes = {
    parentRef: PropTypes.object,
}
