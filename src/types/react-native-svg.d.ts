declare module 'react-native-svg' {
  import * as React from 'react'
  import { ViewProps } from 'react-native'

  export interface SvgProps extends ViewProps {
    width?: number | string
    height?: number | string
  }

  export interface PathProps {
    d: string
    fill?: string
    stroke?: string
    strokeWidth?: number | string
    strokeDasharray?: string
    opacity?: number
  }

  export interface PolylineProps {
    points: string
    fill?: string
    stroke?: string
    strokeWidth?: number | string
    strokeLinejoin?: string
    strokeLinecap?: string
  }

  export const Path: React.ComponentType<PathProps>
  export const Polyline: React.ComponentType<PolylineProps>
  const Svg: React.ComponentType<SvgProps>
  export default Svg
}
