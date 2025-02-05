import React from "react";
import { useProduct } from "vtex.product-context";
import { useDevice } from 'vtex.device-detector'

interface Specification {
  name: string;
  values: string[];
}

interface SpecificationGroup {
  specifications: Specification[];
}

const sizeGuide: React.FC = () => {
  const { product } = useProduct();
  const { isMobile } = useDevice()

  if (!product || !product.properties?.length) return null;

  const bannerSizeGuide = product?.specificationGroups
    ?.flatMap((group: SpecificationGroup) => group?.specifications)
    .find((spec: Specification) => spec.name === "Guia de Tallas desktop")
    ?.values[0];

  const bannerSizeGuideMob = product?.specificationGroups
    ?.flatMap((group: SpecificationGroup) => group?.specifications)
    .find((spec: Specification) => spec.name === "guia de Tallas mobile")
    ?.values[0];

  return (
    <div>
      {
        isMobile ? <img src={bannerSizeGuideMob} alt="Guía de tallas" /> : <img src={bannerSizeGuide} alt="Guía de tallas" />
      }
    </div>
  );
};

export default sizeGuide;