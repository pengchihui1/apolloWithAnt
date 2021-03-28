import { Box, CSSReset } from '@chakra-ui/react'

const EmptyLayout = ({ children, config }) => (
  <Box>
    <CSSReset config={config} />
    {children}
  </Box>
)

export default EmptyLayout
