import { Content } from '@/endpoints/fetchAgentPageData';

interface AgentBenefitsItem {
  item: Content;
}

export function AgentBenefitsItem({ item }: AgentBenefitsItem) {
  return (
    <li>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </li>
  );
}
