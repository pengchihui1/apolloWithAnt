// import { Formik, Form, Field } from 'formik'
// import {
//   FormLabel,
//   Input,
//   RadioGroup,
//   Radio,
//   FormControl,
//   Box,
//   Button
// } from '@chakra-ui/react'

// const FormikTest = () => {
//   return (
//     <Formik
//       initialValues={{

// }}
//       onSubmit={(values, { setSubmitting, setFieldError, setValues }) => {
// }}
//     >
//       {({ isSubmitting, values, setFieldValue }) => (
//         <Form>
//           <Field name='archivedReason'>
//             {({ field, form: { touched, errors }, meta }) => (
//               <FormControl mt={4}>
//                 <FormLabel>封存原因</FormLabel>
//                 <RadioGroup
//                   isInline
//                   spacing={4}
//                   value={12345}
//                   onChange={(e) => { setFieldValue('archivedReason', e.target.value) }}
//                 >
//                   <Radio value='其它'>其它</Radio>
//                 </RadioGroup>
//                 <Input isDisabled placeholder='出生地點' {...field} />
//               </FormControl>
//             )}
//           </Field>
//           <Box
//             as='footer'
//             d='flex'
//             justifyContent='flex-end'
//             py={6}
//             px={5}
//           >
//             <Button
//               h={{ base: '36px', md: '40px' }}
//               fontSize={{ base: '14px', md: '16px' }}
//             //   ref={cancelRef} onClick={onClose}
//             >
//               取消
//             </Button>
//             <Button
//               variantColor='blue'
//               h={{ base: '36px', md: '40px' }}
//               fontSize={{ base: '14px', md: '16px' }}
//               ml={3}
//               type='submit'
//               isLoading={isSubmitting}
//             >
//               {/* {props.buttonText} */}
//             </Button>
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   )
// }

// export default FormikTest
