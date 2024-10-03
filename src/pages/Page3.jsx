import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Page3 = () => {
  return (
    <Box sx={{ height: '100vh', background: 'blue', display:"flex", justifyContent:"center", alignItems:"center" }}>
   
    <Link to="/application" style={{color:"white"}} >
    Apply for Your Free Initial Consultation
    </Link>
    
    </Box>  )
}

export default Page3