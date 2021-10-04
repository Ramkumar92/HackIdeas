import { useState } from "react";
import { tags } from "../../utils/tags";
import Button from "../button";
import Grid from "../grid";
import Input from "../input";
import Tag from "../tag";
import TextArea from "../textArea";
import './style.css';

const Dialog = ({ onClose, onCreate }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [creating, setCreating] = useState(false);

    const handleTagSelect = (tagKey) => {
        if (selectedTags.includes(tagKey)) {
            setSelectedTags(selectedTags.filter(tag => tag !== tagKey));
        } else {
            setSelectedTags([...selectedTags, tagKey]);
        }
    }

    return (
        <div className='dialog__container' onClick={onClose}>
            <Grid
                container
                className='dialog__content'
                onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            >
                <Grid xs={10}>
                    <h1>Add challenge</h1>
                </Grid>
                <Grid xs={2}>
                    <button
                        onClick={onClose}
                        className="button-icon icon-close dialog__close-button"
                        type="button">
                    </button>
                </Grid>
                <Grid xs={12}>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        label='Title' />
                </Grid>
                <Grid xs={12}>
                    <TextArea
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label='Description' />
                </Grid>
                <Grid xs={12} className="form-group">
                    <label>Select Tags</label>
                    {tags.map(tag =>
                        <Tag
                            key={tag.key}
                            text={tag.text}
                            color={tag.color}
                            selected={selectedTags.includes(tag.key)}
                            onClick={() => handleTagSelect(tag.key)}
                        />
                    )}
                </Grid>
                <Grid xs={12}>
                    <Button
                        label="Create"
                        loading={creating}
                        onClick={() => {
                            setCreating(true);
                            onCreate(title, description, selectedTags);
                        }}
                    >
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

Dialog.defaultProps = {
    type: "primary",
    size: "small",
    loading: false
}

export default Dialog;