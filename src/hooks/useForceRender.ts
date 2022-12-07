import { useCallback, useState } from 'react'

const useForceReRender = () => {
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])

  return forceUpdate
}

export default useForceReRender
