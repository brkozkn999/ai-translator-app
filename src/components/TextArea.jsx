
const TextArea = ({ id, value, onChange, placeholder }) => {
    return (
        <textarea rows={5} id={id} placeholder={placeholder} value={value} onChange={onChange}
        className="py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400"/>
    )
}

export default TextArea