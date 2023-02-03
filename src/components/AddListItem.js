import React, { useState } from "react";
import { Input } from "reactstrap";
import "../css/AddListItem.css";

export default function AddListItem({ item, index, _update }) {

    const [empty, setEmpty] = useState(false);

    function _toggleEmpty(input) {
        if (input === "") setEmpty(true);
        else setEmpty(false);
    }

    return (
        <div className="EditListItem">
            {empty ? <div className="emptyListItem">Item cannot be empty</div> : <div/>}
            <Input
                type='text'
                value={item}
                onChange={(e) => {_update(true, e.target.value, index); _toggleEmpty(e.target.value)}}
                className="EditListItem-input"
            />
            <button className="ListItembtn" onClick={() => _update(false, item, index)}>Delete</button>     
        </div>
    );
}