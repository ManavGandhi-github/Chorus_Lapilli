import React from "react";

class Square extends React.Component {
    render() {
        let highlight = this.props.highlight ? 'highlight' : '';
        let classes = `square ${highlight}`
        return (
            <button className={classes} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

export default Square;