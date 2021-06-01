import {
  FormLabel,
  Input,
  // RadioGroup,
  // Radio,
  FormControl,
  Box,
  Button,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import LableName from 'components/labelName'

const SectionLogin = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Formik
      initialValues={{
        name: '123456',
        password: '123456'
      }}
      onSubmit={(values, { setSubmitting, setFieldError, setValues }) => {
        // console.log(values)
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Field name='name'>
            {({ field, form: { touched, errors }, meta }) => (
              <FormControl mt={4}>
                <FormLabel><LableName label='用户名' w='60px' /></FormLabel>
                <Input id='name' {...field} />
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ field, form: { touched, errors }, meta }) => (
              <FormControl mt={4}>
                <FormLabel><LableName label='密码' w='60px' /></FormLabel>
                <InputGroup>
                  <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    id='password'
                    {...field}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Field>
          <Box
            as='footer'
            d='flex'
            justifyContent='flex-end'
            py={6}
            px={5}
          >
            <Button
              h={{ base: '36px', md: '40px' }}
              fontSize={{ base: '14px', md: '16px' }}
            >
              取消
            </Button>
            <Button
              h={{ base: '36px', md: '40px' }}
              fontSize={{ base: '14px', md: '16px' }}
              ml={3}
              type='submit'
              isLoading={isSubmitting}
            >
              登入
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SectionLogin
