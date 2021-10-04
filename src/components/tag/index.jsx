import './style.css';

const Tag = ({ text, value, color, selected, className, ...props }) => {

    return (
        <label
            style={{ backgroundColor: color, color: 'white' }}
            className={(selected ? 'tag tag--selected' : 'tag') + ' ' + (className || '')}
            {...props}
        >
            {text}
        </label >
    );
}

export default Tag;