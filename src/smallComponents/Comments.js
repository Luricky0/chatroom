import React, { useState } from "react"
import { useContacts } from "../contexts/ContactsProvider"
import { MoreOutlined } from "@ant-design/icons"
export default function Comments (props) {
  const { comments } = props
  const { getNameById } = useContacts()
  const [isShowAll, setIsShowAll] = useState(false)
  const getSingleCommentView = (comment) => {
    const { id, text } = comment
    return (
      <div>
        <span style={{ color: 'lightblue' }}>{getNameById(id)}:</span>
        <span> {text} </span>
      </div>
    )
  }

  const getCommentsView = () => {
    if (isShowAll) {
      return comments.map(comment => getSingleCommentView(comment))

    } else {
      if (comments.length > 0) {
        const showComments = comments.slice(0, 3)
        return showComments.map(comment => getSingleCommentView(comment))
      }


    }
  }

  return (
    <div>
      {getCommentsView()}
      {comments.length > 3 && <MoreOutlined onClick={() => setIsShowAll(true)} />}
    </div>
  )


}