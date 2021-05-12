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
import { createWordTimeMutation } from 'shared/graphql/mutations/wordTime/createWordTime'

const AddModal = ({ isOpen, onClose, refetchQueries }) => {
  const [createWordTime] = useMutation(createWordTimeMutation)
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
              startAt: new Date(),
              endAt: new Date(),
              time: 0
            }}
            onSubmit={(values, { setSubmitting, setFieldError, setValues }) => {
              setSubmitting(false)
              createWordTime({
                variables: {
                  input: {
                    startAt: values.startAt,
                    endAt: values.endAt,
                    time: parseInt(values.time)
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
                <Field name='startAt'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>开始日期</Text>
                      <Box className='date-picker-content' border='1px solid #CBD5E0'>
                        <DatePicker
                          id='startAt'
                          className='input'
                          dateFormat='yyyy-MM-dd'
                          selected={values.startAt}
                          onChange={date => {
                            if (date) {
                              date.setSeconds(0)
                              date.setMilliseconds(0)
                            }
                            setFieldValue('startAt', date)
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
                {/* 结束日期 */}
                <Field name='endAt'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>结束日期</Text>
                      <Box className='date-picker-content' border='1px solid #CBD5E0'>
                        <DatePicker
                          id='endAt'
                          className='input'
                          dateFormat='yyyy-MM-dd'
                          selected={values.endAt}
                          onChange={date => {
                            if (date) {
                              date.setSeconds(0)
                              date.setMilliseconds(0)
                            }
                            setFieldValue('endAt', date)
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
                {/* 挑战时间 */}
                <Field name='time'>
                  {({ field, form: { touched, errors }, meta }) => (
                    <Flex alignItems='center' my={1}>
                      <Text width='100px'>挑战时间</Text>
                      <Input
                        width='178px'
                        textAlign='center'
                        defaultValue={values.time || ''}
                        {...field}
                      />
                    </Flex>
                  )}
                </Field>
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
