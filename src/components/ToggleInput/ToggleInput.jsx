export const ToggleInput = ({ isEdit, onChange, ...props }) => {
	return isEdit
		? <input onChange={onChange} {...props} />
		: <p >{props?.type === 'password' ? '******' : props?.value}</p>
}