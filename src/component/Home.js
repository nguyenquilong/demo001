import {Box, Typography} from "@mui/material";

function Home() {
    return <Box style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        margin: 'auto',
        flexDirection: 'column'
    }}>
        <Typography variant="h4">Home Page</Typography>
    </Box>
}

export default Home