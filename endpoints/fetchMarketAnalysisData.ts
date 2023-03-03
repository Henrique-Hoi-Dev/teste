import { Videos } from '@/interfaces/CardVideo'
import { StrapiFile } from '@/interfaces/StrapiFile'
import { StrapiImage } from '@/interfaces/StrapiImage'
import { StrapiLink } from '@/interfaces/StrapiLink'
import { api } from '@/services/api'

export async function fetchMarketAnalysisData(): Promise<MarketAnalysisData> {
  try {
    const response = await api.get('/market-analysis?populate=deep')
    return response.data
  } catch (err) {
    let errMessage = ''
    if (err instanceof Error) errMessage = err.message
    throw new Error(errMessage)
  }
}

export interface MarketAnalysisData {
  data: {
    id: number
    attributes: {
      title: string
      description: string
      cards: Array<Card>
      titleReport: string
      descriptionReport: string
      cardReports: Array<cardReports>
      titleVideo: string
      cardsVideo: Array<Videos>
    }
  }
}

interface Card {
  title: string
  description: string
  subTitle?: string
  image: StrapiImage
}

interface cardReports {
  id: number
  title: string
  description: string
  subTitle: string
  icon: StrapiImage
  link: StrapiLink
  downloadReport?: {
    title: string
    media: StrapiFile
  }
}
