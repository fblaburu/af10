import React, { useEffect } from 'react';

const CamisetasAttachment = () => {
    useEffect(() => {
        addplaceholder();
        const btn = document.querySelector('.vtex-flex-layout-0-x-flexCol--btnpersonalization');
        if(btn){
            btn.addEventListener('click',()=>{
                setTimeout(()=>{addplaceholder()},300);
            })
        }
        
    })
    const addplaceholder = () => {
        const allinputs = document.querySelectorAll('.vtex-flex-layout-0-x-flexCol--btnpersonalization .vtex-styleguide-9-x-input');
        const container = document.querySelector('.vtex-flex-layout-0-x-flexCol--btnpersonalization');
        if(allinputs && allinputs.length > 0){
            allinputs.forEach((input,i)=>{
                if(i===0){
                    input.setAttribute('placeholder','Nombre');
                }else{
                    input.setAttribute('placeholder','Número');
                }                
            })
        }else{            
            if(container && !container.querySelector('.vtex-button')){
                container.classList.add('vtex-flex-layout-0-x-flexCol--btnpersonalization--IsHidden')
            }
        }
    }
    return (
        <></>
    )
};

export default CamisetasAttachment;