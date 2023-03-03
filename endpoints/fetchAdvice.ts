import { api } from '../services/api'
import { Header } from '@/interfaces/Header'
import { Footer } from '@/interfaces/Footer'
import { StrapiLink } from '@/interfaces/StrapiLink'
import { StrapiImage } from '../interfaces'
import { SimpleBanner } from '@/interfaces/StrapiSimpleBanner'
import { StrapiFile } from '@/interfaces/StrapiFile'

export async function fetchAdvice(): Promise<AdviceData> {
  try {
    const response = await api.get('/advice-page-two?populate=deep')
    return response.data
  } catch (err) {
    let errMessage = ''
    if (err instanceof Error) errMessage = err.message
    throw new Error(errMessage)
  }
}

export interface AdviceData {
  data: {
    id: number
    attributes: {
      header: Header
      banner: SimpleBanner
      titleCards: string
      descriptionCards: string
      cards: Array<Card>
      listText: ListText
      cardInfoText: CardInfoText
      footer: Footer
    }
  }
}

interface ListText {
  id: number
  title: string
  contents: Array<CardText>
}

interface CardText {
  id: number
  title: string
  description: string
}

interface CardInfoText {
  title: string
  description: string
  link: StrapiLink
  image: StrapiImage
  imageMobile: StrapiImage
}

export interface Card {
  id: number
  title: string
  description: string
  subTitle: string
  icon: StrapiImage
  iconString?: string
  link?: StrapiLink
  downloadReport?: {
    title: string
    media: StrapiFile
  }
}
