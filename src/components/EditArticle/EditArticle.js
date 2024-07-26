import React from 'react'
import PropTypes from 'prop-types'

export default function EditArticle(props) {
    console.log(props)
    return <div>Edit article {props.params.slug} </div>
}

EditArticle.propTypes = {
    slug: PropTypes.string,
}
