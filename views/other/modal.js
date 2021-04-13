import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra[ui/react'

const ModalTest = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        h={{ base: '100%', md: 'calc(100vh - 7.5rem)' }}
        mt={{ base: '0px', md: '3.75rem' }}
        mb={{ base: '0px', md: '3.75rem' }}
        maxH={{ base: '100%', md: 'calc(100vh - 7.5rem)' }}
        background='rgba(255, 255, 255, 0.9)'
      >
        <ModalHeader borderBottom='1px solid #b7b7b7' textAlign='center'>選擇餘暇活動</ModalHeader>
        <ModalCloseButton />
        <ModalBody d='flex' overflow='hidden' flexDirection='column' />
      </ModalContent>
    </Modal>
  )
}
