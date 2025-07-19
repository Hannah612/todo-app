import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "react-bootstrap";

type Props = {
    setShowEditTaskModal: (showEditTaskModal: boolean) => void;
    showEditTaskModal: boolean
}

const EditTaskModal = ({setShowEditTaskModal, showEditTaskModal}: Props) => {
  return (
    <Modal
        isOpen={showEditTaskModal}
        className='z-1000 mx-auto bg-[#194054] mt-[200px] rounded-md max-w-96 max-h-[500px] overflow-auto'
    >
        <div>
            <div className='bg-[#0E2F3F] w-full rounded-t-md sticky top-0'>
                <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowEditTaskModal(false)}/>
                <div className='flex'>
                    <p className='mx-auto font-bold'>Edit Task</p>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default EditTaskModal