import { memo, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  Input,
  Flex,
  useToast,
  Box
} from '@chakra-ui/core'
import DatePicker from 'react-datepicker'

import TableCell from 'components/table/tableCell'
import TableRow from 'components/table/tableRow'

import { useRouter } from 'next/router'

import { updateStageMutation } from 'shared/graphql/mutations/volunteerStage/updateStage'
import { getVolunteerStageQuery } from 'shared/graphql/queries/volunteerStage/volunteerStage'

const TableRowData = ({ volunteerStage }) => {
  const router = useRouter()
  const toast = useToast()
  const { schoolId = '' } = router.query

  const [isInput, setIsInput] = useState(false)

  const { id, stageName, stageStartAt, stageEndAt } = volunteerStage

  // 最初始
  //   const staticData = [stageName, stageStartAt, stageEndAt]

  //   const stageStart = new Date().toISOString().split('T')[0].split('-')
  //   stageStart[1] = stageStartAt.split('-')[0]
  //   stageStart[2] = stageStartAt.split('-')[1]

  //   const stageEnd = new Date().toISOString().split('T')[0].split('-')
  //   stageEnd[1] = stageEndAt.split('-')[0]
  //   stageEnd[2] = stageEndAt.split('-')[1]

  // 更改值
  //   const [name, setName] = useState(stageName)
  //   const [startAt, setStartAt] = useState(new Date(`${stageStart.join('-')}T${new Date().toISOString().split('T')[1]}`))
  //   const [endAt, setEndAt] = useState(new Date(`${stageEnd.join('-')}T${new Date().toISOString().split('T')[1]}`))

  // 執行修改
  //   const [updateStage] = useMutation(updateStageMutation)

  //   function updateStageClick () {
  //     if (!name.trim()) {
  //       toast({
  //         title: 'Warning',
  //         description: '階段名稱不能為空!',
  //         status: 'warning',
  //         duration: 9000,
  //         isClosable: true,
  //         position: 'top'
  //       })
  //       return null
  //     }

  //     updateStage({
  //       variables: {
  //         input: {
  //           id: id,
  //           stageName: name,
  //           stageStartAt: `${startAt.toISOString().split('T')[0].split('-')[1]}-${startAt.toISOString().split('T')[0].split('-')[2]}`,
  //           stageEndAt: `${endAt.toISOString().split('T')[0].split('-')[1]}-${endAt.toISOString().split('T')[0].split('-')[2]}`,
  //           schoolId: schoolId
  //         }
  //       },
  //       refetchQueries: [{
  //         query: getVolunteerStageQuery,
  //         variables: { schoolId },
  //         fetchPolicy: 'network-only'
  //       }]
  //     }).then(res => {
  //       toast({
  //         title: '系統提示',
  //         description: '修改成功',
  //         status: 'success',
  //         duration: 9000,
  //         isClosable: true,
  //         position: 'top'
  //       })
  //       setIsInput(false)
  //     }).catch(error => {
  //       const errorMessage = error.message.replace('GraphQL error: ', '')
  //       toast({
  //         title: '系統提示',
  //         description: errorMessage,
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //         position: 'top'
  //       })
  //     })
  //   }

  return (
    <TableRow h='40px' key={id} textAlign='center'>
      {/* 展示 */}
      {!isInput && staticData.map((info, index) => (
        <TableCell key={index}>
          {info}
        </TableCell>
      ))}
      {/* 編輯 */}
      {isInput && (
        <>
          <TableCell>
            <Input
              maxLength={70}
              textAlign='center'
              defaultValue={name}
              onChange={e => {
                setName(e.target.value)
              }}
            />
          </TableCell>
          <TableCell>
            <Box className='date-picker-content' border='1px solid #CBD5E0'>
              <DatePicker
                id='startAt'
                className='input'
                dateFormat='yyyy-MM-dd'
                selected={startAt}
                onChange={date => {
                  setStartAt(date)
                }}
                autoComplete='off'
              />
            </Box>
          </TableCell>
          <TableCell>
            <Box className='date-picker-content' border='1px solid #CBD5E0'>
              <DatePicker
                id='endAt'
                className='input'
                dateFormat='yyyy-MM-dd'
                selected={endAt}
                onChange={date => {
                  setEndAt(date)
                }}
                autoComplete='off'
              />
            </Box>
          </TableCell>
        </>
      )}

      <TableCell>
        {!isInput && (
          <Button
            variantColor='teal' size='xs' onClick={() => {
              setIsInput(true)
            }}
          >
            編輯
          </Button>
        )}
        {!!isInput && (
          <Flex justifyContent='center'>
            <Button
              variantColor='teal'
              size='xs'
              onClick={() => {
                updateStageClick()
              }}
            >
              保存
            </Button>
            <Button
              ml='10px'
              variantColor='teal' size='xs' onClick={() => {
                setIsInput(false)
              }}
            >
              取消
            </Button>
          </Flex>
        )}
      </TableCell>
    </TableRow>
  )
}

export default memo(TableRowData)
