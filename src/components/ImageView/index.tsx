
import React, {CSSProperties} from 'react'

type ImageViewProps = {
  icon?: any,
  alt?: string | undefined;
  crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
  decoding?: "async" | "auto" | "sync" | undefined;
  height?: number | string | undefined;
  loading?: "eager" | "lazy" | undefined;
  sizes?: string | undefined;
  src?: string | undefined;
  srcSet?: string | undefined;
  useMap?: string | undefined;
  width?: number | string | undefined;
  additionClass?: string;
  style?: CSSProperties | undefined;
  onClick?: (event: React.MouseEvent<HTMLElement>)=> void;
}
export default function ImageView({icon, alt, height, loading, sizes, width, additionClass, style, onClick}: ImageViewProps) {
  return (
    <img className={additionClass} src={icon} alt={alt} height={height} width={width} loading={loading} sizes={sizes} style={style} onClick={onClick} />
  )
}
