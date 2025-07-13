import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import Modal from 'react-modal';

/*
    NewTaskModal: a modal that open when add task is pressed, and shows a form for the new task input
*/
type Props = {
    show: boolean;
    setShowNewTaskModal: (setShow: boolean) => void;
}

const NewTaskModal = ({show, setShowNewTaskModal}: Props) => {

    return (
    
        <Modal
            isOpen={show}
              style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                    margin: '300px',
                }
            }}
        >
            <div className='flex gap-3 mx-auto'>
                <p>Modal is open</p>
                <XMarkIcon className='basis-1/5 ml-auto' onClick={() => setShowNewTaskModal(false)}/>

            </div>
        </Modal>

  )
}

Modal.setAppElement('#root')

export default NewTaskModal