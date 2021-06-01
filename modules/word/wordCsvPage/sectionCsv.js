import { useState } from 'react'
import {
  Box,
  Button,
  useToast
} from '@chakra-ui/react'

import { csvSplit } from 'lib/csvSplit'
import FileUploadButton from 'components/fileUploadButton'

import CsvTable from 'components/csvTable'
import DescribeTable from 'components/describeTable'
// import { useDebouncedCallback } from 'use-debounce'
import _ from 'lodash'
import { useMutation } from '@apollo/react-hooks'
import { createWordMutation } from 'shared/graphql/mutations/word/createWord'

const tableHead = [
  // thWidth 單位%
  { title: 'Dashboard名稱', thWidth: 50 },
  { title: '班級名稱', thWidth: 50 }
]

// 日期  单词  翻译  读音
const titles = [
  '日期',
  '单词',
  '翻译',
  '读音'
]

const exportTemplate = () => {
  const csvData = [
    '2021/5/24',
    'novel coronavirus',
    '新冠病毒',
    '[co\'ro\'vi\'r]'
  ]

  const content = titles.join(',') + '\n' + csvData.join(',')
  const contentUnicode = convertToUnicode(content)

  const download = require('downloadjs')
  download('\uFEFF' + contentUnicode, '批量新增单词範例格式.csv', 'text/csv')
}

const convertToUnicode = (text) => {
  return text
    .split('')
    .map(doc => String.fromCharCode(doc.charCodeAt(0)))
    .join('')
}

const SectionCsv = () => {
  const toast = useToast()
  // 创建
  const [createWord] = useMutation(createWordMutation)

  const [csvContent, setCsvContent] = useState({})
  const [isUploading, setIsUploading] = useState(true)
  const [isUpload, setIsUpload] = useState(false)

  // const [wordPauseUpload] = useDebouncedCallback((resolve) => {
  //   resolve()
  // }, 500)

  return (
    <Box>
      <Box
        py={4}
        px={2}
        flex='1'
        d='flex'
        flexDirection='column'
      >
        <Box mb={2}>
          <DescribeTable
            describeInfo={[
              {
                fieldName: '日期',
                describe: '必填'
              },
              {
                fieldName: '单词',
                describe: '必填'
              },
              {
                fieldName: '翻译',
                describe: '必填'
              },
              {
                fieldName: '读音',
                describe: '非必填'
              }
            ]}
          />
        </Box>

        <Box>
          <Box
            d='flex'
            justifyContent='space-between'
            flexDirection={{ base: 'column', md: 'initial' }}
            p={3}
            // background='#f2f2f2'
            borderTop='1px solid #e6e6e6'
            borderLeft='1px solid #e6e6e6'
            borderRight='1px solid #e6e6e6'
          >
            <Button
              onClick={exportTemplate}
              colorScheme='cyan'
              minW={{ base: '100%', sm: '100%', md: '200px' }}
              mt={{ base: '10px', md: '0px' }}
            >
              下載範例檔案
            </Button>
            <FileUploadButton
              disabled={isUpload}
              getData={(content) => {
                const clsesObj = {}
                csvSplit(content).forEach((cls, index) => {
                  // 檢測是否有空置存在
                  const emptyCalc = cls.filter(c => !!c)
                  // 獲取都不為空的值
                  if (emptyCalc.length) {
                    clsesObj[index] = {
                      data: cls,
                      /*
                        * state有五種狀態
                        * 未上傳：ready
                        * 上傳成功：success
                        * 上傳失敗：failed
                        * 記錄存在忽略: ignore
                        * 上傳中: uploading
                        */
                      state: 'ready'
                    }
                  }
                })

                let filtedClassesObj = {}
                if (clsesObj['0'].data.join(',') === titles.join(',')) {
                  // 去掉標題列
                  filtedClassesObj = _.omit(clsesObj, ['0'])
                } else {
                  filtedClassesObj = clsesObj
                }

                setCsvContent(filtedClassesObj)
                setIsUploading(false)
              }}
            />
            <Button
              colorScheme='blue'
              minW={{ base: '100%', sm: '100%', md: '200px' }}
              mt={{ base: '10px', md: '0px' }}
              disabled={isUploading}
              // isLoading={isUploading}
              onClick={async () => {
                if (!isUploading) setIsUploading(true)
                if (!isUpload) setIsUpload(true)

                let currentCsvContent = { ...csvContent }

                const wordKeys = Object.keys(csvContent)
                // !不用for in的原因：for in循环出的值不一定是按顺序的
                for (let i = 0; i < wordKeys.length; ++i) {
                  const wordKey = wordKeys[i]
                  const data = csvContent[wordKey].data

                  // 設置當前狀態為上傳中
                  currentCsvContent = {
                    ...currentCsvContent,
                    [wordKey]: {
                      data,
                      state: 'uploading'
                    }
                  }

                  setCsvContent(currentCsvContent)

                  // 暫停500毫秒
                  // await new Promise((resolve, reject) => {
                  //   wordPauseUpload(resolve)
                  // })

                  // 日期转换
                  const times = new Date().toISOString().split('T')
                  times[0] = data[0].split('/').join('-')
                  console.log(`${times[0]}T${times[1]}`)

                  try {
                    await createWord({
                      variables: {
                        input: {
                          name: data[1],
                          time: new Date(`${times[0]}T${times[1]}`),
                          // time:new Date(`${times[0]}T${times[1]}`).toISOString(),
                          translation: data[2],
                          pronunciation: data[3]
                        }
                      }
                    })

                    // 設置成功後的狀態
                    currentCsvContent = {
                      ...currentCsvContent,
                      [wordKey]: {
                        data,
                        state: 'success'
                      }
                    }
                    setCsvContent(currentCsvContent)
                  } catch (error) {
                    const errorMessage = error.message.replace('GraphQL error: ', '')
                    toast({
                      title: '失敗',
                      description: errorMessage,
                      status: 'error',
                      duration: 4000,
                      position: 'top'
                    })
                    setIsUploading(false)
                    setIsUpload(false)

                    // 設置失敗後的狀態
                    currentCsvContent = {
                      ...currentCsvContent,
                      [wordKey]: {
                        data,
                        state: 'failed',
                        error: (errorMessage || '')
                      }
                    }
                    setCsvContent(currentCsvContent)

                    if (errorMessage) {
                      continue
                    } else {
                      break
                    }
                  }
                }
                setIsUploading(false)
                setIsUpload(false)
              }}
            >
              新增
            </Button>
          </Box>
          <CsvTable
            tableHead={tableHead}
            csvContent={csvContent}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SectionCsv
