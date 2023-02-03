import React, { useState } from "react";
import { Input } from "reactstrap";
import "../css/EditListItem.css";

export default function EditListItem({ _delete, item, index, _update }) {

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
                onChange={(e) => {_update(e.target.value, index); _toggleEmpty(e.target.value)}}
                className="EditListItem-input"
            />
            <button className="ListItembtn" onClick={(e) => {e.preventDefault(); _delete(item)}}>Delete</button>     
        </div>
    );
}