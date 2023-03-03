import { Accordion } from "@/components/Common/Accordion";
import {
  AgentPageData,
  fetchAgentPageData,
} from "@/endpoints/fetchAgentPageData";
import { NextPageContext } from "next";
import Head from "next/head";
import { AgentTitle } from "@/components/Agent/AgentTitle";
import { AgentBenefits } from "@/components/Agent/AgentBenefits";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "@/styles/agent.module.scss";

type AgentProps = AgentPageData["data"]["attributes"];

export default function Agent({
  header,
  footer,
  title,
  descriptionWithUrl,
  benefits,
  frequentlyAskedQuestions,
  offices,
}: AgentProps) {
  return (
    <>
      <Head>
        <title>Mirae | Agente de investimentos</title>
        <meta name="description" content="Agente de investimentos" />
      </Head>
      {header?.data ? <Header {...header?.data.attributes} /> : null}
      <main className={`container ${styles["agent-section"]}`}>
        <AgentTitle title={title} {...descriptionWithUrl} />
        <AgentBenefits title={benefits?.title} items={benefits?.contents} />
        <FrequentlyAskedQuestions
          title={frequentlyAskedQuestions?.title}
          items={frequentlyAskedQuestions?.contents}
        />
        <Accordion
          title={offices?.title}
          subtitle={offices?.description}
          description={offices?.details}
          hiddenDescriptionText="Consultar lista"
          shownDescriptionText="Esconder lista"
        />
      </main>
      {footer?.data ? <Footer {...footer?.data.attributes} /> : null}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const agentPageData = await fetchAgentPageData();

    return {
      props: agentPageData?.data.attributes,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
}
