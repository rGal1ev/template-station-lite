import Select from 'react-select'

interface DataSelectProps {
    options: any[]
    value?: any
    label?: string | undefined
    
    onChange: (option: any) => void
}

function DataSelect({
    options,
    value = undefined,
    label = undefined,
    onChange
}: DataSelectProps) {
    return (
        <div className='w-[220px]'>
            <Select styles={{
                        option: (baseStyles) => ({
                            ...baseStyles,
                            color: 'white'
                        }),
                    }}
                    options={options}
                    defaultValue={{
                        value: value,
                        label: value === undefined ? '' : label
                    }}
                    onChange={onChange}
                    noOptionsMessage={() => 'Список пуст'} 
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#525252',
                            neutral0: '#404040',
                            neutral80: 'white',
                            primary25: '#525252',
                            primary50: '#A3A3A3',
                        },
                    })}/>
        </div>
    );
}

export default DataSelect;