import { Context } from "../App";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, Text } from "@chakra-ui/react"
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";

const Profile = () => {
    const data = useLoaderData();
    const navigate = useNavigate();
    //console.log('LOADER DATA:', data);

    const context = useOutletContext() as Context;
    //console.log('CONTEXT:', context);

    const handleLogout = () => {
        localStorage.removeItem('token'); //if token is removed from local storage, user is automatically signed out
        context.toggleLoggedIn();
        navigate('/log-in');

         toaster.create({
                  title: 'Success',
                  description: 'You have been logged out of your account.',
                  duration: 3000,
                })
    }

    return (
        <Box>
            <Text textAlign='center' mb={4} fontSize={20}>
                Account Details
            </Text>
            <Button onClick={handleLogout}>Log Out</Button>
        </Box>
)
};

export default Profile;