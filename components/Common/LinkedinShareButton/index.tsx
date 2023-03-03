import { AiOutlineLinkedin } from "react-icons/ai";

interface Props {
  url: string;
}

export function LinkedinShareButton(props: Props) {
  const { url } = props;

  function generateLinkedinShareUrl() {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  }

  return (
    <a href={generateLinkedinShareUrl()} target="_blank" rel="noreferrer">
      <AiOutlineLinkedin />
    </a>
  );
}
