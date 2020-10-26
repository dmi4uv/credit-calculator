import React from "react";

export default ({onHandleSelect, content, type, label, SelectedProductID}) => {

  const items = []
  if (type==="Products") {
    content.forEach((item, index) => {
      items.push(
        <option key={index}>{item.Title}</option>
      )
    })
  } else {
    content.forEach((item, index) => {
      items.push(
        <option key={index}>{item}</option>
      )
    })
  }

  return(
    <div>
      <label>{label}</label>
      <select onChange={onHandleSelect}>{items}</select>
      <br/>
      {
        (type==="Products")?
          <i>Кредит от {content[SelectedProductID].minAmount} до {content[SelectedProductID].maxAmount} рублей, на срок от {
              (SelectedProductID===4)?
                3 :
                content[SelectedProductID].minTerm
            } до {
              (SelectedProductID===4)?12:
            content[SelectedProductID].maxTerm } месяцев</i>:
          null
      }

    </div>

  )

}