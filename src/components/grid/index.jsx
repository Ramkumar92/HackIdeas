import { useCallback, useEffect, useState } from "react";
import './style.css';

const xsMql = window.matchMedia('(max-width: 360px)');
const smMql = window.matchMedia('(max-width: 600px)');
const mdMql = window.matchMedia('(max-width: 900px)');
const lgMql = window.matchMedia('(max-width: 1200px)');
const xlMql = window.matchMedia('(max-width: 1536px)');

const matchClassName = (container, xs, sm, md, lg, xl) => {

    if (container) {
        return 'grid';
    } else if (xsMql.matches) {
        return 'grid-column-span-' + (xs || 12);
    } else if (smMql.matches) {
        return 'grid-column-span-' + (sm || xs || 12);
    } else if (mdMql.matches) {
        return 'grid-column-span-' + (md || sm || xs || 12);
    } else if (lgMql.matches) {
        return 'grid-column-span-' + (lg || md || sm || xs || 12);
    } else {
        return 'grid-column-span-' + (xl || lg || md || sm || xs || 12);
    }

}

const Grid = ({ xs, sm, md, lg, xl, container, className, children, ...props }) => {

    const getClassName = useCallback(() => matchClassName(container, xs, sm, md, lg, xl), [container, xs, sm, md, lg, xl]);
    const [responsiveClass, setResponsiveClass] = useState(getClassName());

    useEffect(() => {
        if (!container) {
            xsMql.onchange = () => setResponsiveClass(getClassName());
            smMql.onchange = () => setResponsiveClass(getClassName());
            mdMql.onchange = () => setResponsiveClass(getClassName());
            lgMql.onchange = () => setResponsiveClass(getClassName());
            xlMql.onchange = () => setResponsiveClass(getClassName());
        }
    }, [container, getClassName]);

    return (
        <div className={responsiveClass + (className ? ' ' + className : '')} {...props}>
            {children}
        </div>
    );
}

Grid.defaultProps = {
    container: false
}

export default Grid;