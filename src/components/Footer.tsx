import * as React from 'react';

interface IProps {
    url: string
}

export class Footer extends React.Component<IProps, {}> {
    render() {
        return (
            <footer className='footer' >
                <div className='container'>
                    <span className='text-muted'>You can download this project from my github project page at <a href={this.props.url} target="_blank">{this.props.url}</a>.</span>
                </div>
            </footer>
        )
    }
}
