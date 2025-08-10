import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineCheckCircle } from 'react-icons/ai'
export const EditControl = ({
	isEdit,
	id,
	handleEdit,
	editControlClose,
	removeOperation,
	saveEdited,
}) => {
	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			{isEdit === id ? (
				<div style={{ display: 'flex', gap: '5px' }}>
					<AiOutlineCheckCircle onClick={saveEdited} />
					<AiOutlineCloseCircle onClick={editControlClose} />
				</div>
			) : (
				<i>
					<MdEdit onClick={handleEdit} />
				</i>
			)}

			<i onClick={removeOperation}>
				<MdDelete />
			</i>
		</div>
	)
}
