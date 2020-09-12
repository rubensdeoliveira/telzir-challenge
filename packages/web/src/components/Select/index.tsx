import React, { useRef, useEffect } from 'react'
import { OptionTypeBase, Props as SelectProps } from 'react-select'
import { useField } from '@unform/core'
import { StyledReactSelect } from './styles'

interface IProps extends SelectProps<OptionTypeBase> {
  name: string
  placeholder: string
}

const Select: React.FC<IProps> = ({ name, placeholder, ...rest }) => {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <StyledReactSelect
      theme={(theme: any) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary50: 'var(--color-input-text)',
          primary25: 'var(--color-input-text)',
          primary: 'var(--color-input-text)'
        }
      })}
      defaultValue={defaultValue}
      ref={selectRef}
      placeholder={placeholder}
      classNamePrefix="react-select"
      {...rest}
    />
  )
}
export default Select
