import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
}

class Home extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Seans TypeScript React Redux Boilerplate</h1>
                </div>
                <p>Nothing to see here, go and see {<Link to='/Cats'>Cats</Link>} instead.</p>
            </div>
        )
    }
}

export default Home