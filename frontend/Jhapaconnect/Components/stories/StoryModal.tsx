import React, { useState } from 'react'
import "./storymodal.css"


import axios from 'axios'

const StoryModal = ({ show, onClose,image }) => {

    if (show==false) {
        return null
    }
    return (
        <div className='story_overlay'>
            <div className='storymodel_container'>
             

             
                <div className='model_story'>

                    <div className='story_image'>
                       <div className='story-text'>wjkadjkajw</div>
                    <img src={image}/>
                    </div>
                </div>

                

            </div>

            <div className='story-back' >
                <img src="/assets/icons/back.png" width={30} height={30} onClick={onClose}/>
            </div>

        </div>
    )
}

export default StoryModal
