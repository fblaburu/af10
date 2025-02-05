import React, { useEffect,useState } from 'react';
import { useProduct } from 'vtex.product-context';
const CamisetasAttachment = () => {
    const [total,setTotal] = useState(0);
    const productContextValue = useProduct();
    const price = productContextValue?.selectedItem?.sellers[0]?.commertialOffer?.ListPrice;
    const inputValuesName = productContextValue?.assemblyOptions?.inputValues?.['Nombre']?.['nombre-input'];
    const inputValuesNumber = productContextValue?.assemblyOptions?.inputValues?.['Numero']?.['numero-input'];
        
    useEffect(() => {
        addplaceholder();
        hideButtons();        
    });
    useEffect(()=>{
        handleupdatetotal();
    },[productContextValue]);

    const handleupdatetotal = ()=>{
        const assemblyOptions = productContextValue?.assemblyOptions?.items;
        let totalprice = 0;
        if(assemblyOptions){
            const nombre = assemblyOptions['vtex.assembly-option.Nombre_nombre-impreso'];
            const number = assemblyOptions['vtex.assembly-option.Numero_numero-impreso'];
            if(nombre && nombre.length){
                if(nombre[0].quantity ==1){
                    totalprice = totalprice + nombre[0].price;
                }                
            }
            if(number && number.length){
                if(number[0].quantity ==1){
                    totalprice = totalprice + number[0].price;
                }                
            }
            setTotal(totalprice);
        }
        
    }
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
    const hideButtons = ()=>{
        const buttonname = document.querySelector('#Nombre') as HTMLElement;
        const buttonnumero = document.querySelector('#Numero') as HTMLElement;
        const btnvcheck1 = document.querySelector('#nombre-impreso') as HTMLElement;
        const btnvcheck2 = document.querySelector('#numero-impreso') as HTMLElement;
        if(btnvcheck1){
            btnvcheck1.addEventListener('click',()=>{
                buttonname?.click();
                buttonnumero?.click();
                btnvcheck1?.click();
                btnvcheck2?.click();
                setTimeout(()=>{
                    const secondbutton = document.querySelector('.vtex-button-nombre-impreso .lf10-product-customizer-2-x-productAssemblyGroupNameRow .vtex-button') as HTMLElement;
                    if(secondbutton){
                        secondbutton.addEventListener('click',()=>{
                            const numeroimpreso = document.querySelector('.vtex-button-numero-impreso .lf10-product-customizer-2-x-productAssemblyGroupNameRow .vtex-button') as HTMLElement;
                            const nombre = document.querySelector('.vtex-button-Nombre .lf10-product-customizer-2-x-productAssemblyGroupNameRow .vtex-button') as HTMLElement;
                            const numero = document.querySelector('.vtex-button-Numero .lf10-product-customizer-2-x-productAssemblyGroupNameRow .vtex-button') as HTMLElement;
                            numeroimpreso?.click();
                            nombre?.click();
                            numero?.click();                                              
                        })
                    }
                },300);                
            })
        }
        
    }
    const formatearNumero = (numero:any)=>{
        return new Intl.NumberFormat("es-CO").format(numero);
    }
    return (
        <>
        {total!==0?(
            <>
            <div className='vtex-button-totalAssemblyPrices'>
                <p>Total: <b>${formatearNumero(price)} + ${formatearNumero(total)} = ${formatearNumero(price+total)}</b></p>
                
            </div>            
            </>
        ):null}
        {inputValuesName && inputValuesNumber && inputValuesName !== '' && inputValuesNumber !== ''?(
            <div className='vtex-store-components-3-x-Previsualizacion'>Previsualizar</div>
        ):null}
        </>
    )
};

export default CamisetasAttachment;