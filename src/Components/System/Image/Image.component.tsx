import { ImageComponentType } from './Image.type'

import './Image.style.scss'

export const ImageComponent = ({
  src,
  alt,
  rounded,
  square
}: ImageComponentType) => {
  const classList = ['image', rounded ? 'rounded' : '', square ? 'square' : '']
    .filter((classItem) => !!classItem)
    .join(' ')

  return (
    <picture className={classList}>
      <img src={src} alt={alt} />
    </picture>
  )
}
