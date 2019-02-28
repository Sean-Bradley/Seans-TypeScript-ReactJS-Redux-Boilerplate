import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
}

class Birds extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                <p>Nothing to see here, go and see {<Link to='/Cats'>Cats</Link>} instead.</p>
            </div>
        )
    }
}

export default Birds