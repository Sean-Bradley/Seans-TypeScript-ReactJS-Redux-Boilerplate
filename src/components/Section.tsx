import * as React from 'react';
import Home from './Home';
import Cats from './Cats';
import Dogs from './Dogs';
import Birds from './Birds';

interface IProps {
    sub: string
}

export class Section extends React.Component<IProps, {}> {
    render() {
        let c: React.ReactElement;
        switch (this.props.sub) {
            case "Home":
                c = <Home></Home>
                break;
            case "Cats":
                c = <Cats></Cats>
                break;
            case "Dogs":
                c = <Dogs></Dogs>
                break;
            case "Birds":
                c = <Birds></Birds>
                break;
        }
        return (
            <div>
                <h1>{this.props.sub}</h1>
                {c}
            </div >
        )
    }
}