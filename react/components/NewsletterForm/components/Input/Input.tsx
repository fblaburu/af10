import React from 'react';
import styles from './styles.css';

interface InputTextProps {
    name: string,
    type: string,
    
    placeholder: string;
    value: string;
    onChange(event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>): void
    /* error: string; */
    id: string;
}

const InputText = ({
    name,
    type,
    
    placeholder,
    value,
    onChange,
    /* error, */
    id
}: InputTextProps) => {

    return (
        <div className={`${type === 'textarea' ? styles.containerTextAreaElement : styles.containerInputElement} ${styles[`containerInputElement--${name}`]}`}>
            {
                type === 'textarea' ?
                    <textarea
                        className={`db w-100 ${styles.inputElement} ${styles.textAreaElement}`}
                        name={name}
                        rows={5}
                        onChange={onChange}
                        value={value}
                        id={id}
                    /> :
                    <input
                        required
                        className={`db w-100 ${styles.inputElement}`}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        id={id}
                    />
            }
            {/* <span className={`db w-100 ${styles.labelError} ${error !== '' ? styles.showError : ''}`}>{error}</span> */}
        </div>
    )
}

export default InputText
