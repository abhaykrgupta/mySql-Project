import Link from "next/link";
import { Button, Container, Typography, Box } from "@mui/material";


export default function Home() {
  return (
   
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Typography component="h1" variant="h3" align="center">
            Welcome to Auth Dashboard
          </Typography>
          <Typography variant="body1" align="center">
            This is a simple application demonstrating authentication and
            protected routes.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Button
              component={Link}
              href="/dashboard"
              variant="outlined"
              color="secondary"
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </Container>
    
  );
}
