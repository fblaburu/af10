import React from "react";
import { useProduct } from "vtex.product-context";

interface Specification {
  name: string;
  values: string[];
}

interface SpecificationGroup {
  specifications: Specification[];
}

const sizeGuideVal = ({ children }: any) => {
  const productContextValue = useProduct();

  if (!productContextValue?.product || !productContextValue?.product.properties?.length) return null;

  // Se obtiene un arreglo con todas las especificaciones usando map y reduce
  const allSpecifications = productContextValue?.product?.specificationGroups
    ?.map((group: SpecificationGroup) => group.specifications)
    .reduce((acc: Specification[], curr: Specification[]) => acc.concat(curr), []);

  const bannerSizeGuide = allSpecifications?.find(
    (spec: Specification) => spec.name === "Guia de Tallas desktop"
  )?.values[0];

  const bannerSizeGuideMob = allSpecifications?.find(
    (spec: Specification) => spec.name === "guia de Tallas mobile"
  )?.values[0];

  return (
    <>
      {!bannerSizeGuide && !bannerSizeGuideMob ? <></> : <>{children}</>}
    </>
  );
};

export default sizeGuideVal;