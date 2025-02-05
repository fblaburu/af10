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
  console.log('sizeGuideVal')
  const { product } = useProduct()

  if (!product || !product.properties?.length) return null;

  const bannerSizeGuide = product.specificationGroups
    ?.flatMap((group: SpecificationGroup) => group.specifications)
    .find((spec: Specification) => spec.name === "Guia de Tallas desktop")
    ?.values[0];

  const bannerSizeGuideMob = product.specificationGroups
    ?.flatMap((group: SpecificationGroup) => group.specifications)
    .find((spec: Specification) => spec.name === "guia de Tallas mobile")
    ?.values[0];

  console.log('bannerSizeGuide', bannerSizeGuide, bannerSizeGuideMob)

  return (
    <>
      {!bannerSizeGuide && !bannerSizeGuideMob ? <></> : <>{children}</>}

    </>
  );
};

export default sizeGuideVal;