import { ProductsTypes } from "@/interfaces/ProductsTypes";
import { CardWithBackground } from "../CardWithBackground";
import ReactMarkdown from "react-markdown";
import styles from "./styles.module.scss";

interface props {
  activeMenu: ProductsTypes;
}

export function ProductTypes({ activeMenu }: props) {
  return (
    <>
      <section className={styles["card-types-section"]}>
        {activeMenu?.type === "BOVESPA" &&
          activeMenu?.cardType.map((item) => (
            <CardWithBackground {...item} key={item.id} isBeAnAdvisorCard />
          ))}
      </section>

      <section className={styles["product-types-section"]}>
        <h4>{activeMenu?.title}</h4>
        <ul>
          {activeMenu?.product_type_items.map((product) => (
            <li
              key={product?.id}
              className={styles["product-types-section__product"]}
            >
              <h4 className={styles["product-types-section__product__title"]}>
                {product?.title}
              </h4>
              <ReactMarkdown>{product?.description}</ReactMarkdown>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
