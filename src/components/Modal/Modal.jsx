import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ModalDelete from './ModalDelete';
import ModalStatus from './ModalStatus';
import { useGlobalContext } from '../App/context';
import { StyledModal } from './ModalStyles';

const Modal = () => {
    const { state, toggleModal } = useGlobalContext();
    const isDeleteModal = state.isModalOpen.name === 'delete';
    const isStatusModal = state.isModalOpen.name === 'status';
    const isShown = state.isModalOpen.status;
    const modalRef = useRef();

    /**
     * Function to trap user focus within Modal component.
     */
    const focusTrap = (event) => {
        if (event.key === 'Escape' && isShown) toggleModal();
        if (event.key !== 'Tab' || !isShown) return;

        const modalElements = modalRef.current.querySelectorAll('button');
        const firstElement = modalElements[0];
        const lastElement = modalElements[modalElements.length - 1];

        // if going forward by pressing tab and lastElement is active shift focus to first focusable element
        if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }

        // if going backward by pressing tab and firstElement is active shift focus to last focusable element
        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        }
    };

    /**
     * Function to hide Modal component after user click outside Modal contaienr.
     */
    const handleClickOutsideModal = (event) => {
        const target = event.target;
        if (target === modalRef.current) toggleModal();
    };

    const title = document.title;
    // If isShown we focus on our modal container and disable page scrolling,
    // add event listener for keydown event to call focusTrap fn,
    // add event listener for click event to call handleClickOutsideModal fn.
    // Removing the event listener in the return function in order to avoid memory leaks.
    useEffect(() => {
        isShown &&
            (document.addEventListener('keydown', focusTrap),
            document.addEventListener('click', handleClickOutsideModal),
            modalRef.current.focus(),
            (document.body.style.overflow = 'hidden'));

        return () => {
            document.removeEventListener('keydown', focusTrap);
            document.removeEventListener('click', handleClickOutsideModal);
            document.body.style.overflow = 'unset';
        };
    }, [isShown]);

    const modal = (
        <StyledModal
            aria-modal
            aria-label="Confirmation"
            tabIndex={-1}
            role="dialog"
            ref={modalRef}
        >
            {isDeleteModal && <ModalDelete />}
            {isStatusModal && <ModalStatus />}
        </StyledModal>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
