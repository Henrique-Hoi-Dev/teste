import { Banner } from "@/components/Banner";
import { FrequentlyAskedQuestions, BreadCrumb } from "@/components/Common";
import {
  fetchPortabilityPageData,
  Response,
} from "@/endpoints/fetchPortabilityPageData";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { GetStaticProps } from "next";
import { renderTexts } from "@/components/PortabilityText";
import styles from "@/styles/portability.module.scss";

type Props = Response["data"]["attributes"];

export default function Portability(props: Props) {
  const {
    banner,
    description,
    ota,
    procuracao,
    solicitacaoTransferencia,
    solicitaoTransferenciaValoresMobiliarios,
  } = props;

  const renderBreadcrumb = () => (
    <BreadCrumb
      className={styles["portability-section__breadcrumb"]}
      currentRouteTitle="Saiba mais sobre portabilidade"
      previousRoute={{
        href: "blog",
        label: "Blog",
      }}
    />
  );

  const texts = renderTexts({
    ota,
    procuracao,
    solicitacaoTransferencia,
    solicitaoTransferenciaValoresMobiliarios,
  });

  return (
    <section className={styles["portability-section"]}>
      <Banner {...banner} header={renderBreadcrumb()} />
      <section className={styles["portability-section__content"]}>
        <div className="container">
          <p>{description}</p>
          {texts.map((accordion) => (
            <FrequentlyAskedQuestions
              key={accordion.id}
              title={accordion.title}
              numberItem={true}
              items={accordion.contents}
              statusItem={false}
              limiter={4}
              descriptionAsMarkdown={false}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (props) => {
  try {
    const pageData = await fetchPortabilityPageData();

    return {
      props: { ...pageData.data.attributes },
      revalidate: PAGE_REGENERATION_TIME,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
