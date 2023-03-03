export interface FrequentlyAskedQuestions {
  id: number;
  title: string;
  contents: Content[];
}

export interface Content {
  title: string;
  description: string;
}
