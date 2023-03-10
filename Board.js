import React from "react";
import Square from "./Square";

class Board extends React.Component {
    makeSq(index) {
        let highlight = (this.props.source_index === index ? true : false);
        return (
            <Square 
                onClick={() => this.props.onClick(index)}
                value={this.props.squares[index]}
                highlight={highlight}
            />
        )
    }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.makeSq(0)}
                    {this.makeSq(1)}
                    {this.makeSq(2)}
                </div>
                <div className="board-row">
                    {this.makeSq(3)}
                    {this.makeSq(4)}
                    {this.makeSq(5)}
                </div>
                <div className="board-row">
                    {this.makeSq(6)}
                    {this.makeSq(7)}
                    {this.makeSq(8)}
                </div>
            </div>
        );
    }
}

export default Board;