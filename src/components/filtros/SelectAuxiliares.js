import { useState } from 'react'

import AsyncSelect from 'react-select/async'
import Select from 'react-select'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#555',
        cursor: 'pointer',
        color: state.isFocused ? '#fff' : '#555',
        backgroundColor: state.isFocused ? '#9dd3f2' : 'white',
    }),
}

export const SelectAuxiliaresSimple = ({
    isMulti = false,
    options,
    changeSelection,
}) => {
    const handleSelectChange = inputValue => {
        changeSelection(inputValue)
    }

    return (
        <Select
            styles={customStyles}
            placeholder='Selecciona una opción'
            isMulti={isMulti}
            isClearable={true}
            options={options}
            onChange={handleSelectChange}
        />
    )
}

export const SelectAuxiliares = ({ loadOptions, getSelectedValue }) => {
    const [inputValue, setValue] = useState('')
    const [selectedValue, setSelectedValue] = useState(null)

    // handle input change event
    const handleInputChange = value => {
        setValue(value)
    }

    // handle selection
    const handleSelectChange = value => {
        setSelectedValue(value)
        getSelectedValue(value)
    }

    return (
        <AsyncSelect
            styles={customStyles}
            placeholder='Introduce un término de búsqueda (mín. 3 caracteres)'
            cacheOptions={true}
            isClearable={true}
            value={selectedValue}
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={handleSelectChange}
        />
    )
}
