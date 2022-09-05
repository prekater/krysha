import type { IconProps } from './types'

export const ArrowBackIcon = ({ color = '#5F5F5F', width = 88, height = 8, viewBox = '0 0 88 8', ...rest }: IconProps) => (
  <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path d="M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53554 7.53553C4.7308 7.34027 4.7308 7.02369 4.53554 6.82843L1.70711 4L4.53554 1.17157C4.7308 0.976311 4.7308 0.659728 4.53554 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM88 3.5L1 3.5V4.5L88 4.5V3.5Z" fill={color}/>
  </svg>
)
