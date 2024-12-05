import React, { useEffect } from 'react'

interface AddCustomMenuIcon {
    children: any
}
const AddCustomMenuIcon =() => {

    useEffect(() => {        
        addCustomClasswithbanner();
        handleClickMenuMobile();
    });
    
    const addCustomClasswithbanner = ()=>{
        const getMenus = document.querySelectorAll('.vtex-menu-2-x-menuContainer--MenuMobile .vtex-menu-2-x-submenuContainer');
        if(getMenus && getMenus.length > 0){
            getMenus.forEach((menu)=>{          
                const parent = menu.parentNode;
                if(parent){
                    const link =parent.querySelector('.vtex-menu-2-x-styledLinkContainer');
                    if(link){
                        const btn = '<div class="vtex-menu-2-x-btnMobile">+</div>';
                        if(!link.querySelector('.vtex-menu-2-x-btnMobile')){
                            link.insertAdjacentHTML('beforeend',btn)
                        }                        
                    }
                }
                
            })
        }
    }
    const handleClickMenuMobile = ()=>{
            const allopenbutton = document.querySelectorAll('.vtex-menu-2-x-menuContainer--MenuMobile .vtex-menu-2-x-btnMobile');
            if(allopenbutton.length>0){
                allopenbutton.forEach((btn)=>{
                    btn.addEventListener('click',(e)=>{
                        const btnactual = e.target as HTMLElement;
                        if(btnactual){
                            btnactual.classList.toggle('vtex-menu-2-x-btnMobile--active');
                            if(btnactual.classList.contains('vtex-menu-2-x-btnMobile--active')){
                                btnactual.innerHTML = '-'
                            }else{
                                btnactual.innerHTML = '+'
                            }
                            
                            if(btnactual.parentNode){
                                const mainparent = btnactual.parentNode.parentNode;
                                if(mainparent){
                                    const childcontent = mainparent.querySelector('.vtex-menu-2-x-submenuContainer')
                                    if(childcontent?.classList.contains('vtex-menu-2-x-submenuContainer--thirdlevel')){
                                        childcontent?.classList.toggle('vtex-menu-2-x-submenuWrapper--isActive--thirdlevel');
                                    }
                                    else{
                                        if(childcontent?.classList.contains('vtex-menu-2-x-submenuContainer--secondLevel') && !childcontent?.classList.contains('vtex-menu-2-x-submenuContainer--secondLevelPlus')){
                                            childcontent?.classList.toggle('vtex-menu-2-x-submenuWrapper--isActive--secondLevel');
                                        }else{
                                            if(childcontent?.classList.contains('vtex-menu-2-x-submenuContainer--secondLevelPlus')){
                                                childcontent?.classList.toggle('vtex-menu-2-x-submenuWrapper--isActive--secondLevelPlus');
                                            }else{
                                                childcontent?.classList.toggle('vtex-menu-2-x-submenuWrapper--isActive');
                                            }
                                        }                                        
                                    }                                    
                                }                                
                            }                           
                        }                        
                    })
                })
            }
    }
    return (<></>)
}

export default AddCustomMenuIcon
