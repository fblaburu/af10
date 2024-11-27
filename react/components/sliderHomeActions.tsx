import React, { useEffect } from 'react'

const SliderHomeActions = () => {

    useEffect(() => {
        addEventClickThumbnails();
    });
let previusindex = 0;
    const addEventClickThumbnails = () => {
        const allThumbnails = document.querySelectorAll<HTMLElement>('.vtex-store-components-3-x-imageElement--sliderThumbnails');
        
    
        if (allThumbnails.length > 0 ) {
            allThumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', () => {
                    // Change the slider image
                    const dot = document.querySelector<HTMLElement>(`.vtex-slider-layout-0-x-paginationDot--slider-home[aria-label="Dot ${index + 1} of 3"]`);
                    if (dot) {
                        dot.click();
                        changeOrderThumbnails(index);
                    }                
                });
                const parent = thumbnail.parentNode as HTMLElement | null; // Type assertion
                if (parent) {
                    console.log('allThumbnails.length',allThumbnails.length);
                    if (index === 0) {
                        parent.classList.add('vtex-store-components-3-x-order2');
                    } else if (index === 1) {
                        parent.classList.add('vtex-store-components-3-x-order1');
                    } else {
                        parent.classList.add('vtex-store-components-3-x-order3');
                        parent.nextElementSibling?.classList.add('nothumbnail')
                    }
                }
            });
        }
    };
    const changeOrderThumbnails = (activeThumbnail:any)=>{
        if(previusindex === activeThumbnail){
            return;
        }
        const allThumbnails = document.querySelectorAll<HTMLElement>('.vtex-store-components-3-x-imageElement--sliderThumbnails');
        
    
        if (allThumbnails.length > 0 ) {
            allThumbnails.forEach((thumbnail, index) => {
                const parent = thumbnail.parentNode as HTMLElement | null; // Type assertion
                if (parent) {
                    parent.classList.remove('vtex-store-components-3-x-order2')
                    parent.classList.remove('vtex-store-components-3-x-order1')
                    parent.classList.remove('vtex-store-components-3-x-order3')
                    if (activeThumbnail === index) {
                        parent.classList.add('vtex-store-components-3-x-order2');
                    } else {
                        console.log('encontro2',document.querySelector('.vtex-store-components-3-x-order1'))
                        if(document.querySelector('.vtex-store-components-3-x-order1')){
                            parent.classList.add('vtex-store-components-3-x-order3')
                        }else{
                            parent.classList.add('vtex-store-components-3-x-order1')
                        }                     
                    }
                }
            });
            previusindex = activeThumbnail;
        }
        
    }   
    
    
    return (<></>)
}

export default SliderHomeActions;