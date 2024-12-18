import React, { useEffect } from 'react';

const CamisetasAttachment = () => {
    useEffect(() => {
        addplaceholder();
        document.querySelector('.vtex-flex-layout-0-x-flexCol--btnpersonalization')?.addEventListener('click',()=>{
            setTimeout(()=>{addplaceholder()},300);
        })
    })
    const addplaceholder = () => {
        const allinputs = document.querySelectorAll('.vtex-flex-layout-0-x-flexCol--btnpersonalization .vtex-styleguide-9-x-input');
        if(allinputs && allinputs.length){
            allinputs.forEach((input,i)=>{
                if(i===0){
                    input.setAttribute('placeholder','Nombre');
                }else{
                    input.setAttribute('placeholder','Número');
                }                
            })
        }
    }
    return (
        <></>
    )
};

export default CamisetasAttachment;