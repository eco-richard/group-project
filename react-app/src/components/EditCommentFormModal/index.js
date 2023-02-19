import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateCommentThunk } from "../../store/comment";
import "./EditCommentForm.css";

function EditCommentFormModal({comment}) {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.length || content.length > 500) {
            window.alert(
                "Please enter a valid comment that is less than 500 characters."
            );
        }

        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const day = today.getUTCDate();
        const date = `${month}/${day}/${year}`;

        const updatedComment = {
            id: comment.id,
            content,
            updated_at: date,
        };

        await dispatch(updateCommentThunk(updatedComment, comment.id));
        closeModal();
    };
    return (
        <>
            <h2>Edit Comment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    test
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </label>
                <button type="submit">
                    Submit
                </button>
            </form>
        </>
    );
}

export default EditCommentFormModal;
