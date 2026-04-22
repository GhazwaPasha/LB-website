import poster1 from '../../Posters/1.png'
import poster2 from '../../Posters/2.png'
import poster3 from '../../Posters/3.png'
import poster4 from '../../Posters/4.png'

export type HomePosterSlide = { readonly src: string; readonly alt: string }

export const homePosterSlides: readonly HomePosterSlide[] = [
  { src: poster1, alt: 'Love Bites promotional poster 1' },
  { src: poster2, alt: 'Love Bites promotional poster 2' },
  { src: poster3, alt: 'Love Bites promotional poster 3' },
  { src: poster4, alt: 'Love Bites promotional poster 4' },
]
