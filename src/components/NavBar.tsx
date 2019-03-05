import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
}

export class NavBar extends React.Component<IProps, {}> {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to='/'>Seans TypeScript ReactJS Redux Boilerplate</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/cats'>Cats</Link></li>
                            <li><Link to='/dogs'>Dogs</Link></li>
                            <li><Link to='/birds'>Birds</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}