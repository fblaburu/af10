import React, { FC } from 'react'
import { Input } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import useInputValue from './useInputValue'

const CSS_HANDLES = ['textInputValue'] as const

const TextInputValue: FC<Props> = ({ inputValueInfo }) => {
  
  const [state, onChange] = useInputValue(inputValueInfo.label);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    onChange({ value })
  }

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.textInputValue} mb4`}>
      <Input
        value={state}
        onChange={handleChange}
        label={inputValueInfo.label}
        maxLength={inputValueInfo.maxLength}
      />
    </div>
  )
}

interface Props {
  inputValueInfo: TextInputValue
}

export default TextInputValue
