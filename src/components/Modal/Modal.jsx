import styled from './Modal.module.css'
export const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className={styled.modalOverlay}>
			<div className={styled.modal}>
				<button className={styled.modalClose} onClick={onClose}>
					&times;
				</button>
				<div className={styled.modalContent}>{children}</div>
			</div>
		</div>
	)
}
