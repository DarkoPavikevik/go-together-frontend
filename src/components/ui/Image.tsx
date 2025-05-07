import  React from "react"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number
  height?: number
  alt: string
}

const Image = ({ src, width, height, alt, ...props }: ImageProps) => {
  return (
    <img
      src={src || "/placeholder.svg"}
      width={width}
      height={height}
      alt={alt}
      style={{ maxWidth: "100%", height: "auto" }}
      {...props}
    />
  )
}

export default Image