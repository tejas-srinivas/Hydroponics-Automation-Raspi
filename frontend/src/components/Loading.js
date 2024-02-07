import React from 'react'
import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div style={{display: 'flex', flexDirection: "column",alignItems:"center"}}>
            <div style={{ width: "100px", height: "50px", marginTop: "18%" }}>
                <ReactLoading type="cylon" color="rgba(6, 75, 27, 0.9)" height={50} width={100} />
            </div>
                <h2 style={{ color: "rgba(6, 75, 27, 0.9)" }}>Loading ...</h2>
        </div>
    )
}

export default Loading
