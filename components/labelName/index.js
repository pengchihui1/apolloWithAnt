import {
  Box,
  Text
} from '@chakra-ui/react'
import React from 'react'

// 用戶信息的 component ，類型加名字加職業
const LabelName = ({ label, text, labelProps, noComma = false, children, ...props }) => {
  return (
    <Box as='div' d='flex' lineHeight='25px' >
      {!!label && (
        <Box d='flex' flexShrink='0' {...labelProps}>
          <Text w='100%' className='textlabel-align-last' {...props}>
            {label}
          </Text>
          {/* 不想要冒號就用 noComma  */}
          {!noComma && ':'}
        </Box>
      )}
      <Text wordBreak='break-word'>{text}</Text>
      {children}
      <style jsx global>
        {
          // chakra 没有 text-align-last 样式，要利用 css 样式来给它定义文本字体均匀分布
          `
          .textlabel-align-last{
            text-align-last: justify;
          }
        `
        }
      </style>
    </Box>
  )
}

export default LabelName
