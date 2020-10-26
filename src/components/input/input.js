import React from "react";

export default ({label, inputHandleChange,value, name,action = false,disabled = false}) => {
  return (
    <div className="jcsb">
      <label>{label}</label>
      <input onChange={inputHandleChange} type="number" min={0} value={value} name={name} disabled={disabled}/>
      {
        action?
        <button onClick={action}>%</button>:
        null
      }
    </div>
  )
}