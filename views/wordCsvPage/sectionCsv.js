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
import _ from 'lodash'

const tableHead = [
  // thWidth 單位%
  { title: 'Dashboard名稱', thWidth: 50 },
  { title: '班級名稱', thWidth: 50 }
]

// 日期  单词  翻译  读音
const titles = [
  'Dashboard名稱',
  '班級名稱',
  '班級英文名稱',
  '班級代號'
]

const exportTemplate = () => {
  const csvData = [
    '2020/2021 學年',
    '初一甲',
    'j1a',
    'region-j1a'
  ]

  const content = titles.join(',') + '\n' + csvData.join(',')
  const contentUnicode = convertToUnicode(content)

  const download = require('downloadjs')
  download('\uFEFF' + contentUnicode, '批量新增班級範例格式.csv', 'text/csv')
}

const convertToUnicode = (text) => {
  return text
    .split('')
    .map(doc => String.fromCharCode(doc.charCodeAt(0)))
    .join('')
}

const SectionCsv = () => {
  const toast = useToast()

  const [csvContent, setCsvContent] = useState({})
  const [isUploading, setIsUploading] = useState(true)
  const [isUpload, setIsUpload] = useState(false)
  // const [errorMessage, setErrorMessage] = useState(null)

  // const [clsPauseUpload] = useDebouncedCallback(
  //   (resolve) => {
  //     resolve()
  //   }, 500)

  // useEffect(() => {
  //   if (error && !errorMessage) {
  //     setErrorMessage((error.message || 'Error'))
  //   }
  // }, [error])

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
                fieldName: 'Dashboard名稱',
                describe: '必填'
              },
              {
                fieldName: '班級名稱',
                describe: '必填，至少填入3個字以上'
              },
              {
                fieldName: '班級英文名稱',
                describe: '選填可留空'
              },
              {
                fieldName: '班級代號',
                describe: '選填（如果對班級排序有要求，班級代號應該是有序的。例如：k12a, k13a）'
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
              variantColor='cyan'
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
              variantColor='blue'
              minW={{ base: '100%', sm: '100%', md: '200px' }}
              mt={{ base: '10px', md: '0px' }}
              disabled={isUploading}
                // isLoading={isUploading}
              onClick={async () => {
                if (!isUploading) setIsUploading(true)
                if (!isUpload) setIsUpload(true)

                let currentCsvContent = { ...csvContent }
                const clsObjKeys = Object.keys(csvContent)
                // !不用for in的原因：for in循环出的值不一定是按顺序的
                for (let i = 0; i < clsObjKeys.length; ++i) {
                  const clsKey = clsObjKeys[i]
                  const data = csvContent[clsKey].data

                  // 設置當前狀態為上傳中
                  currentCsvContent = {
                    ...currentCsvContent,
                    [clsKey]: {
                      data,
                      state: 'uploading'
                    }
                  }
                  setCsvContent(currentCsvContent)

                  // 暫停500毫秒
                  await new Promise((resolve, reject) => {
                    // clsPauseUpload(resolve)
                  })

                  try {
                    // await createCls({
                    //   variables: {
                    //     input: {
                    //       // .trim()去掉前後空格
                    //       schoolDashboardName: (data[0] || '').trim(),
                    //       name: (data[1] || '').trim(),
                    //       englishName: (data[2] || '').trim(),
                    //       slug: (data[3] || '').trim(),
                    //       schoolId
                    //     }
                    //   }
                    // })

                    // 設置成功後的狀態
                    currentCsvContent = {
                      ...currentCsvContent,
                      [clsKey]: {
                        data,
                        state: 'success'
                      }
                    }
                    setCsvContent(currentCsvContent)
                  } catch (error) {
                    const errorMessage = error.message.replace('GraphQL error: ', '')

                    if (errorMessage !== '該代號重複') {
                      setIsUploading(false)
                      setIsUpload(false)

                      toast({
                        title: '新增班級失敗',
                        description: `${data[1]}：${errorMessage}`,
                        status: 'error',
                        duration: 4000,
                        position: 'top'
                      })
                    }

                    // 設置失敗後的狀態
                    currentCsvContent = {
                      ...currentCsvContent,
                      [clsKey]: {
                        data,
                        state: errorMessage === '該代號重複' ? 'ignore' : 'failed',
                        error: (errorMessage || '')
                      }
                    }
                    setCsvContent(currentCsvContent)

                    if (errorMessage === '該代號重複') {
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
