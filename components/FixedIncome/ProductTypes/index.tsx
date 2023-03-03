import { ProductsTypes } from "@/interfaces/ProductsTypes";
import { ProductTypesData } from "@/endpoints/fetchFixedIncome";

import ReactMarkdown from "react-markdown";

import styles from "./styles.module.scss";

interface props {
  data: ProductTypesData;
  className?: string;
}

export function ProductTypes({ data, className }: props) {
  return (
    <>
      <section className={styles["product-types-section"]}>
        <h4>{data?.title}</h4>
        <ul>
          {data?.items.map((product) => (
            <>
              <li
                key={product?.id}
                className={styles["product-types-section__product"]}
              >
                <div
                  className={styles["product-types-section__product__content"]}
                >
                  <h4
                    className={styles["product-types-section__product__title"]}
                  >
                    {product?.title}
                  </h4>
                  <div className={styles["tags-container"]}>
                    {product.subTitle && <strong>{product.subTitle}</strong>}
                    {product.subDescription && ( <strong>{product.subDescription}</strong> )}
                  </div>
                </div>

                <div className={`${styles["product-types-section__product__sub"]} ${className}`}>
                  <ReactMarkdown>{product?.description}</ReactMarkdown>                   
                </div>  
              </li>          
            </>
          ))}
        </ul>
      </section>
    </>
  );
}
