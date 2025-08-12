import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineCheckCircle } from 'react-icons/ai'
export const EditControl = ({
	controls,
	isEdit,
	id,
	handleEdit,
	editControlClose,
	removeOperation,
	saveEdited,
}) => {
	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			{controls === 'edit' ? (
				isEdit === id ? (
					<div style={{ display: 'flex', gap: '5px' }}>
						<AiOutlineCheckCircle size={20} onClick={saveEdited} />
						<AiOutlineCloseCircle size={20} onClick={editControlClose} />
					</div>
				) : (
					<MdEdit size={20} onClick={handleEdit} />
				)
			) : null}

			<MdDelete size={20} onClick={removeOperation} />
		</div>
	)
}
