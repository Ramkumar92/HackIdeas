import { useState } from "react";
import Button from "../button";
import Grid from "../grid";
import Input from "../input";
import TextArea from "../textArea";
import './style.css';

const Dialog = ({ onClose }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    return (
        <div className='dialog__container' onClick={onClose}>
            <Grid
                container
                className='dialog__content'
                onClick={e => { e.preventDefault(); e.stopPropagation(); }}
            >
                <Grid item xs={10}>
                    <h1>Add challenge</h1>
                </Grid>
                <Grid item xs={2}>
                    <button
                        onClick={onClose}
                        className="button-icon icon-close dialog__close-button"
                        type="button">
                    </button>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        label='Title' />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        label='Description' />
                </Grid>
                <Grid item xs={12}>
                    <Input label='Tags' />
                </Grid>
                <Grid item xs={12}>
                    <Button label="Create">

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