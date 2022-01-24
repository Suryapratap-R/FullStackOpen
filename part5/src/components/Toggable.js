import React, { useState, useImperativeHandle } from 'react';

const Toggable = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const showWhenVisible = {display: isVisible ? null : 'none'}
    const hideWhenVisible = {display: isVisible ? 'none' : null}

    const toggleVisible = () => { setIsVisible(!isVisible) }
    
    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible}>{props.showMessage}</button>
            </div>
            <div style={showWhenVisible} >
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

export default Toggable