import React from 'react'
import ItemBill from './ItemBill'

const ItemModal = ({onClose}) => {
  return (
    <div className='overlay' >
    <div className='modelContainer'  >
        <ItemBill/>

    </div>

</div>
  )
}

export default ItemModal
