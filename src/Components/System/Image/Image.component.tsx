import { ImageComponentType } from '@/Types/Components/ImageComponent.type'

import './Image.style.scss'

export const ImageComponent = ({
  id,
  src,
  alt,
  rounded,
  square
}: ImageComponentType) => {
  const classList = ['image', rounded ? 'rounded' : '', square ? 'square' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <picture className={classList}>
      <img id={id} src={src} alt={alt} />
    </picture>
  )
}
