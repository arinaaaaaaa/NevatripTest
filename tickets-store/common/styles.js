export const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '100% !important',
      border: 'none',
      borderRadius: '0'
    }),
    container: (provided, state) => ({
      ...provided,
      minHeight: '100%',
      fontSize: '1.2em'
    }),
  }
export const customStylesFirst = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '100% !important',
      border: 'none',
      borderRadius: '0',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px'
    }),
    container: (provided, state) => ({
      ...provided,
      minHeight: '100%',
      fontSize: '1.2em'
    }),
  }
export const customStylesLast = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '100% !important',
      border: 'none',
      borderRadius: '0',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px'
    }),
    container: (provided, state) => ({
      ...provided,
      minHeight: '100%',
      fontSize: '1.2em'
    }),
  }