import React, {useEffect,useState} from 'react';
import { useProduct } from 'vtex.product-context';

const RenderPersonalization = () => {

    const productContextValue = useProduct();
    const [inputValuesName,setInputValuesName] = useState(productContextValue?.assemblyOptions?.inputValues?.['Nombre']?.['nombre-input'])
    const [inputValuesNumber,setInputValuesNumber] = useState(productContextValue?.assemblyOptions?.inputValues?.['Numero']?.['numero-input'])    
    const variations = productContextValue?.product?.properties;
    let colorFuente = variations?variations.find((elem:any)=>{return elem.name === 'color-fuente'}):false;
    colorFuente = colorFuente?colorFuente.values?.[0]:false;
    let bordeFuente = variations?variations.find((elem:any)=>{return elem.name === 'color-borde-fuente'}):false;
    bordeFuente = bordeFuente?bordeFuente.values?.[0]:false;
    let tipoFuente = variations?variations.find((elem:any)=>{return elem.name === 'tipo-fuente'}):false;
    tipoFuente = tipoFuente?tipoFuente.values?.[0]:false;
    let publicidad = variations?variations.find((elem:any)=>{return elem.name === 'publicidad'}):false;
    publicidad = publicidad?publicidad.values?.[0]:false;
        
    let imageMockup = productContextValue?.selectedItem?.images.find((img:any)=>{return img.imageLabel.indexOf('camisa-mockup')>-1})
    imageMockup = imageMockup?imageMockup.imageUrl:false;
    
    useEffect(()=>{
        const namevalue = productContextValue?.assemblyOptions?.inputValues?.['Nombre']?.['nombre-input'];
        const numbervalue = productContextValue?.assemblyOptions?.inputValues?.['Numero']?.['numero-input'];
        if(namevalue !== inputValuesName){
            setInputValuesName(productContextValue?.assemblyOptions?.inputValues?.['Nombre']?.['nombre-input'])
        }
        if(numbervalue !== inputValuesNumber){
            setInputValuesNumber(productContextValue?.assemblyOptions?.inputValues?.['Numero']?.['numero-input'])
        }     
    },[productContextValue]);

    useEffect(()=>{
        if(inputValuesName && inputValuesNumber && inputValuesName !== '' && inputValuesNumber!==''){
            const arrayNumber = inputValuesNumber.split('');
            handleRender(arrayNumber);
            handleCloseEvents();
            handleShowEvent();
        }
        if(inputValuesName === '' || inputValuesNumber===''){
            const canvas = document.getElementById('myCanvas');
            if(canvas){
                canvas.remove();
            }
            
            let mainSelector = document.querySelector('.vtex-store-components-3-x-productImageTag--main[title="camisa-mockup"]') as HTMLElement;            
            mainSelector?.classList.remove('vtex-store-components-3-x-is-hidden');
        }
                
    },[inputValuesName,inputValuesNumber]);

    useEffect(()=>{
        setTimeout(()=>{
            const element = document.querySelectorAll('.vtex-store-components-3-x-productImagesThumb');
            if(element && element.length){
                element.forEach((elem:any, index:number)=>{
                    if(index===1){
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                
                        // Disparar el evento de clic en el elemento
                        elem.querySelector('.vtex-store-components-3-x-carouselThumbBorder').dispatchEvent(clickEvent);
                    }
                })
            }
        },1000);
       
    },[])


    const handleCloseEvents = ()=>{
        setTimeout(()=>{
            const btnClosedocument = document.querySelector('.vtex-store-components-3-x-canvasRenderPersonalizationClose');
            if(btnClosedocument){
                btnClosedocument.addEventListener('click',()=>{
                    document.getElementById('myCanvas')?.classList.add('vtex-store-components-3-x-is-hidden');
                })
            }
        },500);
        
        const allThumbs = document.querySelectorAll('.swiper-container-thumbs');
        if(allThumbs && allThumbs.length){
            allThumbs.forEach((thumb)=>{
                thumb.addEventListener('click',()=>{
                    document.getElementById('myCanvas')?.classList.add('vtex-store-components-3-x-is-hidden');
                })
            })
        }
    }
    const handleShowEvent = ()=>{
        const btnshow = document.querySelector('.vtex-store-components-3-x-Previsualizacion');
        if(btnshow){
            btnshow.addEventListener('click',()=>{
                document.getElementById('myCanvas')?.classList.remove('vtex-store-components-3-x-is-hidden');
            })
        }
    }
    const loadFont = async (fontName: string, otfUrl: string, woffUrl: string)=>{
            // Crear un elemento <style> para añadir las reglas CSS
            const style = document.createElement('style');
            style.type = 'text/css';
        
            // Definir las reglas @font-face
            const fontFace = `
                @font-face {
                    font-family: '${fontName}';
                    src: url('${otfUrl}') format('opentype'),
                         url('${woffUrl}') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
            `;
        
            // Añadir las reglas al elemento <style>
            style.appendChild(document.createTextNode(fontFace));
        
            // Añadir el elemento <style> al <head> del documento
            document.head.appendChild(style);        
    }
    if(tipoFuente){
        loadFont(tipoFuente, `https://lf10.vteximg.com.br/arquivos/${tipoFuente}.otf.css`, `https://lf10.vteximg.com.br/arquivos/${tipoFuente}.woff.css`);
    }
    // const fireEvent = (node:any, eventName:any) => {
    //     // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    //     var doc;
    //     if (node.ownerDocument) {
    //         doc = node.ownerDocument;
    //     } else if (node.nodeType == 9){
    //         // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
    //         doc = node;
    //     } else {
    //         throw new Error("Invalid node passed to fireEvent: " + node.id);
    //     }
    
    //      if (node.dispatchEvent) {
    //         // Gecko-style approach (now the standard) takes more work
    //         var eventClass = "";
    
    //         // Different events have different event classes.
    //         // If this switch statement can't map an eventName to an eventClass,
    //         // the event firing is going to fail.
    //         switch (eventName) {
    //             case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
    //             case "mousedown":
    //             case "mouseup":
    //                 eventClass = "MouseEvents";
    //                 break;
    
    //             case "focus":
    //             case "change":
    //             case "blur":
    //             case "select":
    //                 eventClass = "HTMLEvents";
    //                 break;
    
    //             default:
    //                 throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
    //                 break;
    //         }
    //         var event = doc.createEvent(eventClass);
    
    //         var bubbles = eventName == "change" ? false : true;
    //         event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.
    
    //         event.synthetic = true; // allow detection of synthetic events
    //         node.dispatchEvent(event, true);
    //     } else  if (node.fireEvent) {
    //         // IE-old school style
    //         var event = doc.createEventObject();
    //         event.synthetic = true; // allow detection of synthetic events
    //         node.fireEvent("on" + eventName, event);
    //     }
    // };

    const handleRender = (arrayNumber: any) => {
        function drawImagesWithText(
            imagesNumberUrl: string[],
            canvasElement: HTMLCanvasElement,
            text: string,
            font: string,
            textColor: string,
            textBorderColor: string,
            textBorderWidth: number
        ) {
            const ctx = canvasElement.getContext("2d");
            if (!ctx) {
                console.error("No se pudo obtener el contexto del canvas.");
                return;
            }
    
            // Cargar todas las imágenes
            const loadedImages: HTMLImageElement[] = [];
            let imagesLoadedCount = 0;
    
            imagesNumberUrl.forEach(url => {
                const img = new Image();
                img.src = url;
    
                img.onload = () => {
                    loadedImages.push(img);
                    imagesLoadedCount++;
    
                    // Una vez que todas las imágenes están cargadas, dibujamos
                    if (imagesLoadedCount === imagesNumberUrl.length) {
                        drawImages(ctx, loadedImages, text, font, textColor, textBorderColor, textBorderWidth);
                    }
                };
    
                img.onerror = () => {
                    console.error(`Error al cargar la imagen: ${url}`);
                };
            });
        }
    
        function drawImages(
            ctx: CanvasRenderingContext2D,
            images: HTMLImageElement[],
            text: string,
            font: string,
            textColor: string,
            textBorderColor: string,
            textBorderWidth: number
        ) {
            // Ajustar el tamaño del canvas según el tamaño de la primera imagen
            if (images.length > 0) {
                const canvasWidth = 500;
                const canvasHeight = 500;
                ctx.canvas.width = canvasWidth;
                ctx.canvas.height = canvasHeight;
            }
        
            // Dibujar la primera imagen en el canvas con tamaño fijo
            if (images.length > 0) {
                ctx.drawImage(images[0], 0, 0, 500, 500); // Dibuja la primera imagen en la posición (0, 0)
            }
        
            let left = 145; // Starting position for subsequent images
            let totalWidth = 0; // To calculate the total width of the images
        
            // Calculate total width of images (except the first one)
            images.forEach((img: HTMLImageElement, index: number) => {
                if (index > 0) { // Only process images after the first
                    const aspectRatio = img.width / img.height;
                    const newHeight = 100; // Fixed height for subsequent images
                    const newWidth = newHeight * aspectRatio; // Maintain the aspect ratio
                    totalWidth += newWidth + 10; // Add width and spacing
                }
            });
        
            // Calculate starting position to center images
            left = (ctx.canvas.width - totalWidth) / 2; // Centering the images
        
            // Draw the images centered
            images.forEach((img: HTMLImageElement, index: number) => {
                if (index > 0) { // Only process images after the first
                    const aspectRatio = img.width / img.height;
                    const newHeight = 100; // Fixed height for subsequent images
                    const newWidth = newHeight * aspectRatio; // Maintain the aspect ratio
        
                    // Draw the image with calculated width and height
                    ctx.drawImage(img, left, publicidad && publicidad== 'si'?170:130, newWidth, newHeight);
                    left += newWidth + 10; // Space between images
                }
            });
        
            // Configurar el estilo del texto
            ctx.font = font;
            ctx.fillStyle = textColor;
            ctx.strokeStyle = textBorderColor;
            ctx.lineWidth = textBorderWidth;
        
            // Calcular la posición X para centrar el texto
            const textWidth = ctx.measureText(text).width;
            const textX = (500 - textWidth) / 2; // Centrar el texto
            const textY = publicidad && publicidad== 'si'?150:110; // Ajusta la posición Y según sea necesario
        
            // Dibujar el texto en el canvas
            ctx.strokeText(text, textX, textY); // Ajusta la posición según sea necesario
            ctx.fillText(text, textX, textY); // Ajusta la posición según sea necesario

            let mainSelector = document.querySelector('.vtex-stack-layout-0-x-stackItem--product--first') as HTMLElement;
            
            if(document.getElementById('myCanvas')){                
                if(mainSelector){                    
                    document.getElementById('myCanvas')?.remove();
                    let canvasElementContainer = document.createElement("div");
                    
                    if(canvasElementContainer){
                        canvasElementContainer.id = 'myCanvas';
                        canvasElementContainer.classList.add('vtex-store-components-3-x-canvasRenderPersonalization')
                        const closeHtml = document.createElement("div");
                        closeHtml.innerHTML = 'X';
                        closeHtml.classList.add('vtex-store-components-3-x-canvasRenderPersonalizationClose')
                        canvasElementContainer.appendChild(closeHtml);
                        canvasElementContainer.appendChild(canvasElement);
                        mainSelector.appendChild(canvasElementContainer);
                    }                    
                }
            }else{
                let canvasElementContainer = document.createElement("div");
                
                if(canvasElementContainer){
                    canvasElementContainer.id = 'myCanvas';
                    const closeHtml = document.createElement("div");
                    closeHtml.innerHTML = 'X';
                    closeHtml.classList.add('vtex-store-components-3-x-canvasRenderPersonalizationClose')
                    canvasElementContainer.appendChild(closeHtml);
                    canvasElementContainer.classList.add('vtex-store-components-3-x-canvasRenderPersonalization')
                    canvasElementContainer.appendChild(canvasElement);
                    mainSelector.appendChild(canvasElementContainer);
                }
            }
        }
    
        // Ejemplo de uso
        let imagesNumberUrl: string[] = [imageMockup];
        arrayNumber.forEach((number: any) => {
            const getImages = variations?.find((item: any) => {
                return item?.name?.toLowerCase() === `imagen ${number}`;
            });
            if (getImages) {
                imagesNumberUrl.push(`https://lf10.myvtex.com/arquivos/${getImages.values[0]}`);
            }
        });
    
        let canvasElement = document.createElement("canvas");
        canvasElement.classList.add('vtex-store-components-3-x-canvasPersonalization');
        const text = inputValuesName;
        const font = `30px ${tipoFuente}, sans-serif`;
        const textColor = colorFuente;
        const textBorderColor = bordeFuente;
        const textBorderWidth = 2;
        drawImagesWithText(imagesNumberUrl, canvasElement, text, font, textColor, textBorderColor, textBorderWidth);
    };
    
    
    return (
        <>            
        </>
    )
};

export default RenderPersonalization;