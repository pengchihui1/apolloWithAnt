// import{
//     Box
// }from '@chakra-ui/react'

// const TurnPage=()=>{
//     return(
//       {/* 翻頁 */}
//       <Box py={2}  d='flex' justifyContent='center'>
//         {page !== 1 && (
//             <Button
//             size='sm'
//             mx={5}
//             variantColor='blue'
//             onClick={() => setPage(1)}
//             >
//             第一頁
//             </Button>
//         )}
//         <Button
//             size='sm'
//             mx={5}
//             variantColor='cyan'
//             isDisabled={page === 1}
//             onClick={() => setPage(page - 1)}
//         >
//             上一頁
//         </Button>
//         <Button
//             size='sm'
//             mx={5}
//             variantColor='teal'
//             isDisabled={!pageInfo.hasNextPage}
//             onClick={() => setPage(page + 1)}
//         >
//             下一頁
//         </Button>
//       </Box>
//     )
// }

// export default TurnPage
