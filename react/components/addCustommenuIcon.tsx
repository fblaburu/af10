import React, { useEffect } from 'react'

const AddCustomMenuIcon = () => {
    useEffect(() => {
        handleaddimage();
        addCustomClasswithbanner();
    });
    const handleaddimage = () => {
        const allSubItems = document.querySelectorAll('.vtex-menu-2-x-submenu .vtex-menu-2-x-menuItem .vtex-menu-2-x-styledLink');
        if (allSubItems) {
            allSubItems.forEach((item) => {
                // const id = item.id;
                const elem = item.querySelector('.vtex-menu-2-x-styledLinkContent');
                if (elem) {
                    if(!elem.querySelector('.vtex-menu-2-x-imageSubmenu')){
                        const html = `<img class="vtex-menu-2-x-imageSubmenu" src="/arquivos/premier-league.svg?v=1.1">`;
                        // const html = `<img src="/arquivos/${id}.svg">`;
                        elem.innerHTML = html + elem.innerHTML;
                    }                    
                }
            })
        }
    }
    const addCustomClasswithbanner = ()=>{
        const getImage = document.querySelector('.vtex-menu-2-x-submenu .vtex-store-components-3-x-imageElement');
        if(getImage){
            const elem = document.querySelector('.vtex-menu-2-x-submenuWrapper--thirdlevel');
            if(elem){
                elem.classList.add('vtex-menu-2-x-submenuWrapper--imageSubmenu');
            }else{
                document.querySelector('.vtex-menu-2-x-submenuWrapper')?.classList.add('vtex-menu-2-x-submenuWrapper--imageSubmenu');
            }
        }
    }
    return (<></>)
}

export default AddCustomMenuIcon
