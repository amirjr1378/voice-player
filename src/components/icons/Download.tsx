import * as React from 'react'
import { SVGProps } from 'react'

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 14 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m13.352 8.422-6.31 6.934c-.156.178-.445.178-.623 0L.108 8.422c-.245-.266-.045-.689.311-.689h3.089V.4c0-.222.178-.4.4-.4h5.6c.222 0 .4.178.4.4v7.333h3.089c.4 0 .578.423.355.69Zm.09 11.245v-2.222a.342.342 0 0 0-.334-.334H.352a.342.342 0 0 0-.333.334v2.222c0 .177.156.333.333.333H13.13c.178 0 .311-.133.311-.333Z"
      fill="#F1F1F1"
    />
  </svg>
)

export default SvgDownload
