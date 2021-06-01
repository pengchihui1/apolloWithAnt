import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Box,
  Text,
  useToast
} from '@chakra-ui/react'

import { Formik, Form, Field } from 'formik'
import DatePicker from 'react-datepicker'

import { useMutation } from '@apollo/react-hooks'
import { createWordMutation } from 'shared/graphql/mutations/word/createWord'

const AddModal = ({ isOpen, onClose, refetchQueries }) => {
  const [createWord] = useMutation(createWordMutation)
  const toast = useToast()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              time: new Date(),
              name: '',
              translation: '',
              pronunciation: ''
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setValues }) => {
              setSubmitting(false)
              createWord({
                variables: {
                  input: {
                    name: values.name,
                    time: values.time.toISOString(),
                    translation: values.translation,
                    pronunciation: values.pronunciation
                  }
                },
                refetchQueries
              }).then(() => {
                toast({
                  title: '系统提示',
                  description: '添加成功',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                  position: 'top'
                })
              }).catch(error => {
                const message = error.message.replace('GraphQL error: ', '') || 'error'
                toast({
                  title: '系统提示',
                  description: message || '添加失败',
                  status: 'error',
                  duration: 1000,
                  isClosable: true,
                  position: 'top'
                })
              })
            }}
          >
            {({ isSubmitting, values, setValues, setFieldValue }) => (
              <Form>
                {/* 开始日期 */}
                <Field name='time'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>挑战日期</Text>
                      <Box className='date-picker-content' border='1px solid #CBD5E0'>
                        <DatePicker
                          id='time'
                          className='input'
                          dateFormat='yyyy-MM-dd'
                          selected={values.time}
                          onChange={date => {
                            if (date) {
                              date.setSeconds(0)
                              date.setMilliseconds(0)
                            }
                            setFieldValue('time', date)
                          }}
                          peekNextMonth
                          showMonthDropdown
                          timeIntervals={15}
                          showTimeSelect
                          autoComplete='off'
                        />
                      </Box>
                    </Flex>
                  )}
                </Field>
                {/* 单词 */}
                <Field name='name'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>单词</Text>
                      <Input
                        width='178px'
                        textAlign='left'
                        defaultValue={values.name || ''}
                        onInput={(e) => {
                          setFieldValue('name', e.target.value)
                        }}
                      />
                    </Flex>
                  )}
                </Field>
                {/* 翻译 */}
                <Field name='translation'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>翻译</Text>
                      <Input
                        width='178px'
                        textAlign='left'
                        defaultValue={values.translation || ''}
                        onInput={(e) => {
                          setFieldValue('translation', e.target.value)
                        }}
                      />
                    </Flex>
                  )}
                </Field>
                {/* 读音 */}
                <Field name='pronunciation'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>读音</Text>
                      <Input
                        width='178px'
                        textAlign='left'
                        defaultValue={values.pronunciation || ''}
                        onInput={(e) => {
                          setFieldValue('pronunciation', e.target.value)
                        }}
                      />
                    </Flex>
                  )}
                </Field>
                {/* 提交 */}
                <Flex justify='space-around' my={10}>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    variant='ghost'
                    type='submit'
                    isLoading={isSubmitting}
                  >Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
        {/* 為了去掉點擊是會有黑色邊框 */}
        <style jsx global>
          {`
            .input{
              text-align: center;
              cursor:pointer;
              line-height:30px;
              background-color: rgba(255,255,255,0.01);
            }
            .date-picker-content button:focus,
            .input:focus{
              outline: none;
            }
        `}
        </style>
      </ModalContent>
    </Modal>
  )
}

export default AddModal
