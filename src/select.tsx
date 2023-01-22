import style from './select.module.css';
import React, { useEffect, useState } from 'react'
export type selectOptions = {
    value: String | number | any
    label: String
}
type SingleSelect = {
    multiple: false,
    value: selectOptions,
    onChange: (props: selectOptions | undefined) => void
}
type MultiSelect = {
    multiple: true,
    value: selectOptions[],
    onChange: (props: selectOptions[]) => void
}

type SelectProps = {
    option: selectOptions[],
} & (SingleSelect | MultiSelect)
export function Select({ multiple, value, option, onChange }: SelectProps) {
    const [isOpen, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    function resetValue(e: any) {
        e.stopPropagation();
        multiple ? onChange([]) : onChange(undefined);
    }
    function selectOption(e: any, option: selectOptions) {
        e.stopPropagation();
        if (multiple) {
            if (value.includes(option)) onChange(value.filter(o => o.label !== option.label))
            else onChange([...value, option])
        } else {

            if (value !== option) onChange(option)
        }
    }
    function getSelectedList(option: selectOptions) {
        return multiple ? value.includes(option) : option === value;
    }
    function getHighlightedIndex(ind: any) {
        console.log(ind)
        setHighlightedIndex(ind)
    }
    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])
    return (
        <div
            onClick={() => setOpen(prev => !prev)}
            onBlur={() => setOpen(false)}
            tabIndex={0} className={style.container}>
            <span className={style.value}>{multiple ? value.map(ob => (
                <button className={style['option-batch']}  onClick={(e)=>selectOption(e,ob)}>
                    <span className={style['clear-btn']} >{ob.label} &times;</span>
                </button>
            )) : value?.label}</span>
            <button className={style['clear-btn']} onClick={(e) => resetValue(e)}>&times;</button>
            <div className={style.divider}></div>
            <div className={style.caret}></div>
            <ul className={`${style.options} ${isOpen ? style.show : ''}`}>
                {option.map((item, index) => (<li onMouseEnter={() => getHighlightedIndex(index)} className={`${style.option} ${getSelectedList(item) ? style.selected : ''} ${highlightedIndex === index ? style.highlight : ''}`} onClick={(e) => selectOption(e, item)}>{item.label}</li>))}
            </ul>
        </div>
    )
}