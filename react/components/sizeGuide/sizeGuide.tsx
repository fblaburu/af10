import React from "react";
import { useProduct } from 'vtex.product-context';
import { useDevice } from 'vtex.device-detector'

interface Specification {
  name: string;
  values: string[];
}

interface SpecificationGroup {
  specifications: Specification[];
}

const sizeGuide: React.FC = () => {
  const productContextValue = useProduct();
  const { isMobile } = useDevice()

  if (!productContextValue?.product || !productContextValue?.product.properties?.length) return null;

  // Se obtiene un arreglo con todas las especificaciones usando map y reduce.
  const allSpecifications = productContextValue?.product?.specificationGroups
    ?.map((group: SpecificationGroup) => group.specifications)
    .reduce((acc: Specification[], curr: Specification[]) => acc.concat(curr), []);

  const bannerSizeGuide = allSpecifications.find(
    (spec: Specification) => spec.name === "Guia de Tallas desktop"
  )?.values[0];
  
  const bannerSizeGuideMob = allSpecifications.find(
    (spec: Specification) => spec.name === "guia de Tallas mobile"
  )?.values[0];

  return (
    <div>
      {
        isMobile 
          ? <img src={bannerSizeGuideMob} alt="Guía de tallas" /> 
          : <img src={bannerSizeGuide} alt="Guía de tallas" />
      }
    </div>
  );
};

export default sizeGuide;