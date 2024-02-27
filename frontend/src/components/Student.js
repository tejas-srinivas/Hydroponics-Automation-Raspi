import React from 'react'

const Student = ({ student }) => {
    return (
        <div className="student">
            <img src={student.image} alt="student" width={170} height={160} style={{ borderRadius: "50%" }} />
            <div style={{display:"flex",flexDirection:"column"}}>
                <strong>{student.name}</strong>
                <strong>{student.usn}</strong>
            </div>
        </div>
    )
}

export default Student
