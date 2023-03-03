import React, { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import {
  fetchContactUsPageData,
  ContactUsData,
} from "@/endpoints/fetchContactUsPageData";
import { PAGE_REGENERATION_TIME } from "@/utils/constants";
import { FrequentlyAskedQuestions } from "@/components/Common/FrequentlyAskedQuestions";
import { InfoCard } from "@/components/Common/InfoCard";
import { SearchInput } from "@/components/Common/SearchInput";
import { Link } from "@/components/Common/Link";
import { ContactUsForm } from "@/components/ContactUs/Form";
import { GenericCard } from "@/components/Common/GenericCard";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { AiOutlineWhatsApp } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import { FullWidthBackgroundContainer } from "@/components/Common/FullWidthBackgroundContainer";
import styles from "@/styles/contact-us.module.scss";

type Props = ContactUsData["data"]["attributes"];

export default function ContactUs(props: Props) {
  const {
    title,
    frequent_asked_questions,
    contactUsForm,
    cards,
    cardOuvidoria,
    banner,
    titleCanaisAtendimento,
    titleAtendimento,
  } = props;

  const [filteredList, setFilteredList] = useState(
    frequent_asked_questions.contents
  );

  const onSearch = (value: string) => {
    const newFilteredList = frequent_asked_questions.contents.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredList(newFilteredList);
  };

  return (
    <section className={styles["contact-us-outer-container"]}>
      <Head>
        <title> Mirae | Fale Conosco</title>
        <meta name="description" content="Mirae Assets" />
      </Head>
      <section className={`${styles["contact-us-header-container"]}`}>
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
      <section className={styles["frequently-asked"]}>
        <div className="container">
          <SearchInput
            placeholder="Ex: Título pré-fixado"
            onChange={(ev) => onSearch(ev.target.value)}
          />
          <FrequentlyAskedQuestions
            title={frequent_asked_questions.title}
            items={filteredList}
            numberItem={true}
            statusItem={false}
            descriptionAsMarkdown={true}
          />
        </div>
      </section>
      <section className={styles["send-a-message"]}>
        <div className="container">
          <ContactUsForm {...contactUsForm} />
        </div>
      </section>
      <section className={styles["info-cards"]}>
        <div className="container">
          <h2 className={styles["title--inverted"]}>
            {titleCanaisAtendimento}{" "}
          </h2>
          <div className={styles["divider"]}></div>
          <strong className={styles["subtitle--inverted"]}>
            {titleAtendimento}
          </strong>
          <div className={styles["info-cards-container"]}>
            {cards.map((card) => (
              <InfoCard
                key={card.id}
                title={card.title}
                phoneNumber={card.phoneNumber}
                email={card.email}
                infoMessage={card?.info_message}
              />
            ))}
          </div>
          <GenericCard
            title={cardOuvidoria.title}
            className={styles["info-cards-container__full-width-card"]}
          >
            {cardOuvidoria.content.map((item) => (
              <li key={item.id}>
                <StrapiImage src={item.icon?.data?.attributes?.url} />
                {item.text}
              </li>
            ))}
          </GenericCard>
        </div>
      </section>
      <FullWidthBackgroundContainer
        className={styles["informative-banner"]}
        background={banner.image}
        backgroundMobile={banner?.imageMobile}
        defaultHeight={false}
        visible={banner?.visible}
      >
        <div className={`${styles["informative-banner__content"]} full-width`}>
          <h3>{banner.title} </h3>
          <ReactMarkdown>{banner.description}</ReactMarkdown>
          <Link
            href={banner.link?.Url}
            target={banner.link?.Target}
            variant="contained"
            className="hidden-tablet"
          >
            <AiOutlineWhatsApp /> {banner.link?.Label}
          </Link>
        </div>
        <div className={`${styles["informative-banner__qr-code"]}`}>
          <StrapiImage src={banner?.qrCode?.data?.attributes?.url} />
        </div>
        <Link
          href={banner.link?.Url}
          target={banner.link?.Target}
          variant="contained"
          className="tablet-visible"
        >
          <AiOutlineWhatsApp /> {banner.link?.Label}
        </Link>
      </FullWidthBackgroundContainer>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageData = await fetchContactUsPageData();

    return {
      props: {
        ...pageData?.data.attributes,
      },
      revalidate: PAGE_REGENERATION_TIME * 4,
    };
  } catch (err) {
    return {
      props: {
        error: true,
      },
    };
  }
};
