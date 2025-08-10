import styled from './Modal.module.css'
export const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null
	const onCloseOverlay = e => {
		if (e.target !== e.currentTarget) return
		onClose()
	}
	return (
		<div className={styled.modalOverlay} onClick={onCloseOverlay}>
			<div className={styled.modal}>
				<button className={styled.modalClose} onClick={onClose}>
					&times;
				</button>
				<div className={styled.modalContent}>{children}</div>
			</div>
		</div>
	)
}
